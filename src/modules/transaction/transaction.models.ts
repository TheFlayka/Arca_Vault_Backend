// Mongo DB
import { clientPromise } from '#src/mongodb.js'
import { ObjectId } from 'mongodb'

// Response Functions &  Types
import { sendErrorResponse, sendSuccessResponse } from '#shared/index.js'
import { AllResponse } from '#types/response.types.js'

// Types
import { decodeJWT } from '#shared/jwtDecode.js'
import { ITransaction, ITransactionBeforeSend } from './transaction.types.js'

export const createTransaction = async (
  token: string,
  body: ITransaction
): Promise<AllResponse> => {
  try {
    const moneybox = await (
      await clientPromise
    )
      .db()
      .collection('moneybox')
      .findOne({ _id: new ObjectId(body.moneyboxId) })

    if (!moneybox || moneybox.deletedAt !== null) {
      return sendErrorResponse('Такой копилки не существует', 404)
    }
    if (moneybox.currentGoal > moneybox.targetGoal && body.operator === 'inc') {
      return sendErrorResponse('Превышена целевая сумма копилки', 400)
    }
    if (moneybox.user.toString() !== decodeJWT(token)._id) {
      return sendErrorResponse('У вас нет доступа к этой копилке', 403)
    }

    const newTransactionObj: ITransactionBeforeSend = {
      ...body,
      createdAt: new Date(),
    }
    await ( await clientPromise ).db().collection('transactions').insertOne(newTransactionObj)

    if (body.operator === 'inc') {
      await (
        await clientPromise
      )
        .db()
        .collection('moneybox')
        .updateOne({ _id: new ObjectId(body.moneyboxId) }, { $inc: { currentGoal: body.amount } })
    } else {
      await (
        await clientPromise
      )
        .db()
        .collection('moneybox')
        .updateOne({ _id: new ObjectId(body.moneyboxId) }, { $inc: { currentGoal: -body.amount } })
    }
    
    return sendSuccessResponse('Транзакция успешно создана', 200)
  } catch (error) {
    return sendErrorResponse('Ошибка при создании транзакции', 500, error)
  }
}
