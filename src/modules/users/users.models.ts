// Mongo DB & bcrypt & jwt
import { clientPromise } from '#src/mongodb.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Types
import { InsertOneResult, ObjectId } from 'mongodb'

import { AllResponse } from '#types/response.types.js'
import {
  IRegisterUser,
  IUserFromDB,
  IUserBeforeSend,
  IUser,
  UpdateUserObject,
  IChangePassword,
} from './users.types.js'

// Tokens
import { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } from '#src/env.js'

// Functions
import { checkOneObject, sendErrorResponse, sendSuccessResponse } from '#shared/index.js'
import { isString, isSuccessResponse } from '#shared/isSuccess.js'
import { decodeJWT } from '#shared/jwtDecode.js'
import { hashPassword } from '#src/shared/hashPassword.js'

export const registerUser = async (body: IRegisterUser): Promise<AllResponse> => {
  try {
    const usersCollection = (await clientPromise).db().collection<Omit<IUserFromDB, '_id'>>('users')
    const users: Array<IUserFromDB> = await usersCollection.find().toArray()
    const user: IUserFromDB | undefined = users.find((user) => user.login === body.login)
    if (user)
      return sendErrorResponse('Пользователь с таким логином существует, введите другой', 409)

    const passwordHash: string = await hashPassword(body.password)

    const { password, ...bodyInfo } = body
    const newUser: IUserBeforeSend = {
      ...bodyInfo,
      password: passwordHash,
      deletedAt: null,
      passwordChangedAt: new Date(),
      userRefreshToken: null,
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
    if (!isSuccessResponse<IUserFromDB>(resultCheck)) return resultCheck

    const validPassword: boolean = await bcrypt.compare(body.password, resultCheck.data.password)
    if (!validPassword) return sendErrorResponse('Неправильный пароль', 400)

    const access: string = jwt.sign(
      {
        _id: resultCheck.data._id.toString(),
      },
      JWT_SECRET_ACCESS,
      { expiresIn: '15m' }
    )

    const refresh: string = jwt.sign(
      {
        _id: resultCheck.data._id.toString(),
      },
      JWT_SECRET_REFRESH,
      { expiresIn: '30d' }
    )

    await (
      await clientPromise
    )
      .db()
      .collection('users')
      .updateOne({ _id: resultCheck.data._id }, { $set: { userRefreshToken: refresh } })

    return sendSuccessResponse('Пользователь успешно авторизовался', 200, {
      access,
      refresh,
    })
  } catch (error) {
    return sendErrorResponse('Ошибка при авторизаций пользователя', 500, error)
  }
}

export const getUser = async (user: IUserFromDB): Promise<AllResponse> => {
  try {
    const { password, deletedAt, _id, userRefreshToken, ...userInfo } = user

    return sendSuccessResponse('Данные найдены и получены', 200, userInfo)
  } catch (error) {
    return sendErrorResponse('Ошибка при получений данных пользователя', 500, error)
  } 
}

export const changeUser = async (user: IUserFromDB, body: UpdateUserObject): Promise<AllResponse> => {
  try {
    if (body.login) {
      if (!body.password) return sendErrorResponse('Для изменения login требуется пароль', 400)
      if (!isString(body.password)) return sendErrorResponse('Пароль неверного формата', 400)
      const validPassword: boolean = await bcrypt.compare(body.password, user.password)
      if (!validPassword) return sendErrorResponse('Неправильный пароль', 400)
    }

    const { password, ...updateBody } = body

    const resultUpdate = await (await clientPromise)
      .db()
      .collection('users')
      .updateOne({ _id: user._id }, { $set: updateBody })
    if (resultUpdate.modifiedCount === 0) {
      return sendErrorResponse('Нет изменений — данные не обновлены', 400)
    }

    return sendSuccessResponse('Данные пользователя изменены', 200)
  } catch (error) {
    return sendErrorResponse('Ошибка при получений данных пользователя', 500, error)
  }
}

export const changePasswordUser = async (
  user: IUserFromDB,
  body: IChangePassword
): Promise<AllResponse> => {
  try {
    if (body.oldPassword === body.newPassword)
      return sendErrorResponse('Новый пароль одинаков со старым. введите новый', 400)
    const validPassword: boolean = await bcrypt.compare(body.oldPassword, user.password)
    if (!validPassword) return sendErrorResponse('Неправильный пароль', 400)

    const passwordHash: string = await hashPassword(body.newPassword)

    const resultUpdate = await (
      await clientPromise
    )
      .db()
      .collection('users')
      .updateOne(
        { _id: user._id },
        { $set: { password: passwordHash, passwordChangedAt: new Date() } }
      )
    if (resultUpdate.modifiedCount === 0) {
      return sendErrorResponse('Нет изменений — пароль не обновлен', 400)
    }

    return sendSuccessResponse('Пароль пользователя изменен', 200)
  } catch (error) {
    return sendErrorResponse('Ошибка при изменений пароля пользователя', 500, error)
  }
}

export const deleteUser = async (user: IUserFromDB): Promise<AllResponse> => {
  try {
    await (
      await clientPromise
    )
      .db()
      .collection('users')
      .updateOne({ _id: user._id }, { $set: { deletedAt: new Date() } })

    return sendSuccessResponse('Пользователь успешно удален', 200)
  } catch (error) {
    return sendErrorResponse('Ошибка при удалений пользователя', 500, error)
  }
}

export const logoutUser = async (user: IUserFromDB): Promise<AllResponse> => {
  try {
    await (
      await clientPromise
    )
      .db()
      .collection('users')
      .updateOne({ _id: user._id }, { $set: { userRefreshToken: null } })

    return sendSuccessResponse('Пользователь успешно вышел', 200)
  } catch (error) {
    return sendErrorResponse('Ошибка при выходе пользователя', 500, error)
  }
}
