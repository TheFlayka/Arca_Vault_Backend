// Users Schemas & Controllers
import { registrationSchema, loginSchema } from './users.validations.js'
import {
  registerUserController,
  loginUserController,
  getUserController,
} from './users.controllers.js'

// Shared Middlewares
import { createObjectMiddleware, checkBodyMiddleware } from '#shared/index.js'
import { checkAccessTokenMiddleware } from '#shared/middlewares/checkTokenMiddleware.js'

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

router.get('/api/users', checkAccessTokenMiddleware, getUserController)

export default router
