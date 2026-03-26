// Express
import { Router } from 'express';

// Middlewares
import { checkBodyMiddleware } from '#shared/index.js'
import { validationMiddleware } from '#shared/index.js';

// Schemas
import { createTransactionSchema } from './transaction.validations.js'

// Controllers
import { createTransactionController } from './transaction.controllers.js'

const router = Router();

router.post('/api/transactions', checkBodyMiddleware, validationMiddleware(createTransactionSchema), createTransactionController)

export default router;