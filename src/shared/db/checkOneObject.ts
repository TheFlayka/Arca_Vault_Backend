// MongoDb
import { clientPromise } from '#src/mongodb.js'
import { sendErrorResponse, sendSuccessResponse } from '#shared/response/sendResponse.js'
import { AllResponse } from '#types/response.types.js'

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
