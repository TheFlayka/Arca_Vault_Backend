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
  logoutUserController,
} from './users.controllers.js'

// Shared Middlewares
import { validationMiddleware, checkBodyMiddleware } from '#shared/index.js'
import { checkAccessTokenMiddleware } from '#shared/middlewares/checkTokenMiddleware.js'
import { checkUserMiddleware } from '#shared/middlewares/checkUserMiddleware.js'

// Router
import { Router } from 'express'


const router = Router()

router.post(
  '/api/users',
  checkBodyMiddleware,
  validationMiddleware(registrationSchema),
  registerUserController
)

router.post(
  '/api/users/login',
  checkBodyMiddleware,
  validationMiddleware(loginSchema),
  loginUserController
)

router.get('/api/users', checkAccessTokenMiddleware, checkUserMiddleware, getUserController)
router.put(
  '/api/users',
  validationMiddleware(optionalRegistrationSchema),
  checkAccessTokenMiddleware,
  checkBodyMiddleware,
  changeUserController
)

router.put(
  '/api/users/password',
  validationMiddleware(passwordSchema),
  checkAccessTokenMiddleware,
  checkBodyMiddleware,
  changePasswordUserController
)

router.delete('/api/users/', checkAccessTokenMiddleware, deleteUserController)
router.post('/api/users/logout', checkAccessTokenMiddleware, logoutUserController)

export default router
