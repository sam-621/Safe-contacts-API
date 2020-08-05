import { Router } from 'express';
const router = Router();
import { addContactsController } from '../controllers/user.controllers';
import { AddContactValidator } from '../validators/contacts.validators';
import authMiddleware from '../middlewares/auth.middleware';

router.post(
    '/add',
    AddContactValidator,
    authMiddleware,
    addContactsController
)

export default router;