// Users Schemas & Controllers
import {
  registrationSchema,
  loginSchema,
  optionalRegistrationSchema,
  passwordSchema,
} from './users.validations.js'
import {
  registerUserController,
  loginUserController,
  getUserController,
  changeUserController,
  changePasswordUserController,
  deleteUserController,
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
router.put(
  '/api/users',
  createObjectMiddleware(optionalRegistrationSchema),
  checkAccessTokenMiddleware,
  checkBodyMiddleware,
  changeUserController
)

router.put(
  '/api/users/password',
  createObjectMiddleware(passwordSchema),
  checkAccessTokenMiddleware,
  checkBodyMiddleware,
  changePasswordUserController
)

router.delete('/api/users/', checkAccessTokenMiddleware, deleteUserController)

export default router
