import { ObjectId } from 'mongodb'

export interface IUser {
  login: string
  password: string
}

export interface IRegisterUser extends IUser {
  name: string
  surname: string
}

export interface IUserBeforeSend extends IRegisterUser {
  deletedAt: Date | null
  passwordChangedAt: Date | null
}

export interface IUserFromDB extends IUserBeforeSend {
  _id: ObjectId
}

export type UpdateUserObject = Partial<IRegisterUser>

export interface IToken {
  access: string
  refresh: string
}
