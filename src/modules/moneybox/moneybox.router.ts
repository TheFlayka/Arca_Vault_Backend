// Shared
import { checkBodyMiddleware, createObjectMiddleware } from '#shared/index.js'
// Schemas
import { createMoneyboxSchema } from './moneybox.validations.js'
// Middlewares
import { checkAccessTokenMiddleware } from '#shared/middlewares/checkTokenMiddleware.js'
import { checkUserMiddleware } from '#shared/middlewares/checkUserMiddleware.js'
// Controllers
import { createMoneyboxController, deleteMoneyboxController, getMoneyboxController, getMoneyboxesController, restoreMoneyboxController, updateMoneyboxController } from './moneybox.controller.js'

// Router
import { Router } from 'express'
const router = Router()

router.use(checkAccessTokenMiddleware)
router.use(checkUserMiddleware)

router.post(
  '/api/moneybox',
  checkBodyMiddleware,
  createObjectMiddleware(createMoneyboxSchema),
  createMoneyboxController
)
router.get('/api/moneybox', getMoneyboxesController)
router.get('/api/moneybox/:id', getMoneyboxController)
router.delete('/api/moneybox/:id', deleteMoneyboxController)
router.put('/api/moneybox/:id/restore', restoreMoneyboxController)
router.put('/api/moneybox/:id', updateMoneyboxController)



export default router
