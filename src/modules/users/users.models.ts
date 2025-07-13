// Mongo DB & bcrypt
import { clientPromise } from '#src/mongodb.js'
import bcrypt from 'bcrypt'

// Types & Functions Import
import { InsertOneResult } from 'mongodb'

import { sendErrorResponse, sendSuccessResponse } from '#shared/index.js'
import { AllResponse } from '#types/response.types.js'
import { IRegisterUser, IUserFromDB, IUserBeforeSend } from './index.js'

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
