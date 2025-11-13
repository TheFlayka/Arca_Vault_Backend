// Mongo DB
import { clientPromise } from '#src/mongodb.js'
import { InsertOneResult } from 'mongodb'

// Response Functions &  Types
import { sendErrorResponse, sendSuccessResponse } from '#shared/index.js'
import { AllResponse } from '#types/response.types.js'

// Types
import { IUserFromDB } from '#modules/common/common.types.js'
import { IMoneybox, IMoneyboxBeforeSend, IMoneyboxFromDB } from './moneybox.types.js'

export const createMoneybox = async (user: IUserFromDB, body: IMoneybox): Promise<AllResponse> => {
  try {
    const boxCollection = (await clientPromise)
      .db()
      .collection<Omit<IMoneyboxFromDB, '_id'>>('moneybox')
    const boxes: Array<IMoneyboxFromDB> = await boxCollection
      .find({ user: user._id, deletedAt: null })
      .toArray()
    const box: IMoneyboxFromDB | undefined = boxes.find((box) => box.name === box.name)
    if (box)
      return sendErrorResponse('Копилка с таким названием уже существует, введите другую', 409)

    const newBox: IMoneyboxBeforeSend = {
      ...body,
      deletedAt: null,
      user: user._id,
      currentReach: 0,
    }

    const createResult: InsertOneResult = await boxCollection.insertOne(newBox)
    if (!createResult.acknowledged || !createResult.insertedId) {
      return sendErrorResponse('Не удалось создать копилку', 500)
    }

    return sendSuccessResponse('Копилка успешно создана', 200)
  } catch (error) {
    return sendErrorResponse('Ошибка при созданий копилки', 500, error)
  }
}
