// Mongo DB
import { clientPromise } from '#src/mongodb.js'
import { ObjectId } from 'mongodb'

// Response Functions &  Types
import { sendErrorResponse, sendSuccessResponse } from '#shared/index.js'
import { AllResponse } from '#types/response.types.js'

// Types
import { IMoneybox, IMoneyboxBeforeSend, IMoneyboxFromDB } from './moneybox.types.js'
import { decodeJWT } from '#shared/jwtDecode.js'

export const createMoneybox = async (token: string, body: IMoneybox): Promise<AllResponse> => {
  try {
    const moneybox = await (
      await clientPromise
    )
      .db()
      .collection<IMoneyboxFromDB>('moneybox')
      .findOne({
        user: ObjectId.createFromHexString(decodeJWT(token)._id),
        name: body.name,
      })
    if (moneybox)
      return sendErrorResponse('Копилка с таким названием уже существует, введите другое', 409)

    const newBox: IMoneyboxBeforeSend = {
      ...body,
      deletedAt: null,
      user: ObjectId.createFromHexString(decodeJWT(token)._id),
      currentGoal: 0,
    }

    await (await clientPromise).db().collection('moneybox').insertOne(newBox)

    return sendSuccessResponse('Копилка успешно создана', 200)
  } catch (error) {
    return sendErrorResponse('Ошибка при созданий копилки', 500, error)
  }
}

export const getMoneyboxes = async (token: string): Promise<AllResponse> => {
  try {
    const moneyboxes = await (
      await clientPromise
    )
      .db()
      .collection<IMoneyboxFromDB>('moneybox')
      .find(
        {
          user: ObjectId.createFromHexString(decodeJWT(token)._id),
        },
        { projection: { user: 0 } }
      )
      .toArray()

    return sendSuccessResponse('Копилки успешно найдены', 200, moneyboxes)
  } catch (error) {
    return sendErrorResponse('Ошибка при поиске копилок', 500, error)
  }
}

export const deleteMoneybox = async (token: string, moneyboxId: string): Promise<AllResponse> => {
  try {
    const moneybox = await (
      await clientPromise
    )
      .db()
      .collection<IMoneyboxFromDB>('moneybox')
      .findOne({
        user: ObjectId.createFromHexString(decodeJWT(token)._id),
        _id: ObjectId.createFromHexString(moneyboxId),
      })
    if (!moneybox)
      return sendErrorResponse('Копилка не найдена', 404)
    if (moneybox.deletedAt !== null) {
      return sendErrorResponse('Копилка уже удалена', 409)
    }

    await (
      await clientPromise
    )
      .db()
      .collection('moneybox')
      .updateOne(
        {
          user: ObjectId.createFromHexString(decodeJWT(token)._id),
          _id: ObjectId.createFromHexString(moneyboxId),
        },
        { $set: { deletedAt: new Date() } }
      )

    return sendSuccessResponse('Копилки успешно удалена', 200)
  } catch (error) {
    return sendErrorResponse('Ошибка при удалений копилки', 500, error)
  }
}