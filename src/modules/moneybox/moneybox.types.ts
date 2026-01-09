import { ObjectId } from "mongodb"

export interface IMoneybox {
  name: string, 
  targetGoal: number
}

export interface IMoneyboxBeforeSend extends IMoneybox {
  user: ObjectId
  deletedAt: Date | null
  currentGoal: number
}

export interface IMoneyboxFromDB extends IMoneyboxBeforeSend {
  _id: ObjectId
}