// Cors and cookie Parser
import cookieParser from 'cookie-parser'
import cors, { CorsOptions } from 'cors'

const corsOptions: CorsOptions = {
  origin: 'https://localhost:5173',
  credentials: true,
}

// Express Server
import express from 'express'

const app = express()

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

// Router
import { routes } from './modules/index.js'
app.use(routes)

// MongoDB & Server
import { PORT } from './env.js'
import { clientPromise } from './mongodb.js'

async function startServer() {
  try {
    await clientPromise
    console.log('MongoDB connected')

    app.listen(PORT, () => console.log(`Server was start on http://localhost:${PORT}`))
  } catch (error) {
    console.error('Error connecting or starting the server:', error)
    process.exit(1)
  }
}

startServer()
