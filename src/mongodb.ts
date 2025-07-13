import { MongoClient } from 'mongodb'
import { MONGO_URL } from './env.js'

const client = new MongoClient(MONGO_URL)
export const clientPromise = client.connect()
