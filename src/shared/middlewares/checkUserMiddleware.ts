import { NextFunction, Request, Response } from 'express'
import { sendErrorResponse } from '../response/sendResponse.js'
import { decodeJWT } from '../jwtDecode.js'
import { checkOneObject } from '../db/checkOneObject.js'
import { ObjectId } from 'mongodb'
import { isSuccessResponse } from '../isSuccess.js'
import { IUserFromDB } from '#modules/common/common.types.js'

export const checkUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resultCheck = await checkOneObject(
      'users',
      {
        _id: ObjectId.createFromHexString(decodeJWT(req.cookies.accessToken)._id),
      },
      'пользователя'
    )

    if (!isSuccessResponse<IUserFromDB>(resultCheck))
      return res.status(resultCheck.status).json(resultCheck)

    next()
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при поиске пользователя', 500, error))
    return
  }
}
