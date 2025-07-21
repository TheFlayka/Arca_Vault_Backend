// Mongo DB & bcrypt & jwt
import { clientPromise } from '#src/mongodb.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Types
import { InsertOneResult } from 'mongodb'

import { AllResponse } from '#types/response.types.js'
import { IRegisterUser, IUserFromDB, IUserBeforeSend, IUser } from './users.types.js'
// Tokens
import { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } from '#src/env.js'

// Functions
import { checkOneObject, sendErrorResponse, sendSuccessResponse } from '#shared/index.js'
import { isSuccess } from '#shared/isSuccess.js'

export const registerUser = async (body: IRegisterUser): Promise<AllResponse> => {
  try {
    const usersCollection = (await clientPromise).db().collection<Omit<IUserFromDB, '_id'>>('users')
    const users: Array<IUserFromDB> = await usersCollection.find().toArray()
    const user: IUserFromDB | undefined = users.find((user) => user.login === body.login)
    if (user)
      return sendErrorResponse('Пользователь с таким логином существует, введите другой', 409)

    const salt = await bcrypt.genSalt(10)
    const passwordHash: string = await bcrypt.hash(body.password, salt)

    const { password, ...bodyInfo } = body
    const newUser: IUserBeforeSend = {
      ...bodyInfo,
      password: passwordHash,
      deletedAt: null,
    }

    const createResult: InsertOneResult = await usersCollection.insertOne(newUser)
    if (!createResult.acknowledged || !createResult.insertedId) {
      return sendErrorResponse('Не удалось создать пользователя', 500)
    }

    return sendSuccessResponse('Пользователь успешно зарегистрирован', 201)
  } catch (error) {
    return sendErrorResponse('Ошибка при регистраций пользователя', 500, error)
  }
}

export const loginUser = async (body: IUser): Promise<AllResponse> => {
  try {
    const { password, ...reqUser } = body
    const resultCheck = await checkOneObject('users', reqUser, 'пользователя')
    if (!isSuccess<IUserFromDB>(resultCheck)) return resultCheck

    const validPassword: boolean = await bcrypt.compare(body.password, resultCheck.data.password)
    if (!validPassword) return sendErrorResponse('Неправильный пароль', 400)

    const accessToken: string = jwt.sign(
      {
        _id: resultCheck.data._id.toString(),
      },
      JWT_SECRET_ACCESS,
      { expiresIn: '15m' }
    )

    const refreshToken: string = jwt.sign(
      {
        _id: resultCheck.data._id.toString(),
      },
      JWT_SECRET_REFRESH,
      { expiresIn: '30d' }
    )

    return sendSuccessResponse('Пользователь успешно авторизовался', 200, {
      accessToken,
      refreshToken,
    })
  } catch (error) {
    return sendErrorResponse('Ошибка при авторизаций пользователя', 500, error)
  }
}
