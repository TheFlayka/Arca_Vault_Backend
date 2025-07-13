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
}

export interface IUserFromDB extends IUserBeforeSend {
  _id: ObjectId
}
