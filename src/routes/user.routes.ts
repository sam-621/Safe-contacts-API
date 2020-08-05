import { Router } from 'express';
const router = Router();
import {
    addContactsController, 
    getContactsController,
    getContactController
} from '../controllers/user.controllers';
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

router.get(
    '/contacts/:contactID',
    getContactController
)
export default router;