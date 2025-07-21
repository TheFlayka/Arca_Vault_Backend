// Schemas, Controllers & Middlewares
import { registrationSchema, loginSchema } from './users.validations.js'
import { registerUserController, loginUserController } from './users.controllers.js'
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

router.post(
  '/api/users/login',
  checkBodyMiddleware,
  createObjectMiddleware(loginSchema),
  loginUserController
)

export default router
