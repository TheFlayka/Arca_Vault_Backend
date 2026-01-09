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
        name: body.name
      })
    if (moneybox) return sendErrorResponse('Копилка с таким названием уже существует, введите другое', 409)

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
