// MongoDb
import { ObjectId } from 'mongodb'
import { clientPromise } from '#src/mongodb.js'
import { sendErrorResponse, sendSuccessResponse } from '#shared/response/sendResponse.js'
import { AllResponse } from '#types/response.types.js'
import { isSuccessResponse } from '#shared/isSuccess.js'

// Functions
import { decodeJWT } from '#shared/jwtDecode.js'

// Types
import { IModuleType } from '#types/module.types.js'

export const checkOneObject = async (
  collection: string,
  query: Record<string, unknown>,
  type: string = 'объект'
): Promise<AllResponse> => {
  try {
    const object = await (
      await clientPromise
    )
      .db()
      .collection(collection)
      .findOne({ ...query, deletedAt: null })
    if (!object) {
      return sendErrorResponse(`Не удалось найти ${type}`, 404, [])
    }
    return sendSuccessResponse('Объект найден', 200, object)
  } catch (error) {
    return sendErrorResponse('Ошибка при нахождений объекта', 500, error)
  }
}

export const newModelFunction = async <TData, TBody = undefined>(
  fn: (data: TData, body: TBody) => Promise<AllResponse>, module: IModuleType,
  token: string, body?: TBody
) => {
  const resultCheck = await checkOneObject(
    module.type,
    {
      _id: ObjectId.createFromHexString(decodeJWT(token)._id),
    },
    module.case
  )
  if (!isSuccessResponse<TData>(resultCheck)) return resultCheck
  return fn(resultCheck.data, body as TBody)
}
