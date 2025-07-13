// Index & Middlewares
import { registrationSchema, registerUserController } from './index.js'
import { createObjectMiddleware, checkBodyMiddleware } from '#shared/index.js'

// Router
import { Router } from 'express'
const router = Router()

router.post(
  '/api/users',
  checkBodyMiddleware,
  createObjectMiddleware(registrationSchema),
  registerUserController
)

export default router
