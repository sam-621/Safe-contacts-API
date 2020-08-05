import { Router } from 'express';
const router = Router();
import { addContactsController, getContactsController } from '../controllers/user.controllers';
import { AddContactValidator } from '../validators/contacts.validators';
import authMiddleware from '../middlewares/auth.middleware';

router.post(
    '/add',
    AddContactValidator,
    authMiddleware,
    addContactsController
)

router.get(
    '/contacts',
    authMiddleware,
    getContactsController
)

export default router;