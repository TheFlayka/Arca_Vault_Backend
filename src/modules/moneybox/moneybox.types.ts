import { ObjectId } from "mongodb"

export interface IMoneybox {
  name: string, 
  reach: number
}

export interface IMoneyboxBeforeSend extends IMoneybox {
  user: ObjectId
  deletedAt: Date | null
  currentReach: number
}

export interface IMoneyboxFromDB extends IMoneyboxBeforeSend {
  _id: ObjectId
}