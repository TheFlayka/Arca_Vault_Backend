// Shared
import { checkBodyMiddleware, createObjectMiddleware } from '#shared/index.js'
// Schemas
import { createMoneyboxSchema } from './moneybox.validations.js'
// Middlewares
import { checkAccessTokenMiddleware } from '#shared/middlewares/checkTokenMiddleware.js'
import { checkUserMiddleware } from '#shared/middlewares/checkUserMiddleware.js'
// Controllers
import { createMoneyboxController } from './moneybox.controller.js'

// Router
import { Router } from 'express'
const router = Router()

router.post(
  '/api/moneybox',
  checkAccessTokenMiddleware,
  checkBodyMiddleware,
  createObjectMiddleware(createMoneyboxSchema),
  checkUserMiddleware,
  createMoneyboxController
)

export default router
