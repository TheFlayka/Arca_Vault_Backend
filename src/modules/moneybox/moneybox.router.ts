// Shared
import { checkBodyMiddleware, createObjectMiddleware } from '#shared/index.js'
// Schemas
import { createMoneyboxSchema } from './moneybox.validations.js'
// Middlewares
import { checkAccessTokenMiddleware } from '#src/shared/middlewares/checkTokenMiddleware.js'

// Router
import { Router } from 'express'
// Controllers
import { createMoneyboxController } from './moneybox.controller.js'

const router = Router()

router.post(
  '/api/moneybox',
  checkAccessTokenMiddleware,
  checkBodyMiddleware,
  createObjectMiddleware(createMoneyboxSchema),
  createMoneyboxController
)

export default router
