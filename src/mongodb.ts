import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URL!)
export const clientPromise = client.connect()
