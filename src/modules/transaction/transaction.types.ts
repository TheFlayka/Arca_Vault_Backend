import { ObjectId } from 'mongodb'

export interface ITransaction {
  name: string
  amount: number
  moneyboxId: ObjectId
  operator: 'inc' | 'dec'
}

export interface ITransactionBeforeSend extends ITransaction {
  createdAt: Date
}

export interface ITransactionFromDB extends ITransactionBeforeSend {
  _id: ObjectId
}