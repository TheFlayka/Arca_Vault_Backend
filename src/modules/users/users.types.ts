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
  userRefreshToken: string | null
}

export interface IUserFromDB extends IUserBeforeSend {
  _id: ObjectId
}

export type UpdateUserObject = Partial<IRegisterUser>

export interface IToken {
  access: string
  refresh: string
}

export interface IChangePassword {
  oldPassword: string
  newPassword: string
}
