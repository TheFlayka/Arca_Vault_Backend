import dotenv from 'dotenv'
dotenv.config()

if (!process.env.MONGO_URL) {
  throw new Error('MongoDB URL is missing')
}
if (!process.env.JWT_SECRET_ACCESS) {
  throw new Error('JWT Access is missing')
}
if (!process.env.JWT_SECRET_REFRESH) {
  throw new Error('JWT Refresh is missing')
}

export const MONGO_URL = process.env.MONGO_URL
export const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS
export const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH
export const PORT = process.env.PORT || 3000
