// Types User
import { IUserBeforeSend } from '../users/users.types.js'
import { ObjectId } from 'mongodb'

export interface IUserFromDB extends IUserBeforeSend {
  _id: ObjectId
}

// Module User
import { IModuleType } from '#types/module.types.js'
export const moduleUser: IModuleType = { type: 'users', case: 'пользователя' }