import { Router } from 'express';
const router = Router();
import {
    addContactsController, 
    getContactsController,
    getContactController,
    editContactController
} from '../controllers/user.controllers';
import { ContactValidator } from '../validators/contacts.validators';
import authMiddleware from '../middlewares/auth.middleware';

router.post(
    '/add',
    ContactValidator,
    authMiddleware,
    addContactsController
)

router.get(
    '/contacts',
    authMiddleware,
    getContactsController
)

router.route('/contacts/:contactID')
    .get(getContactController)
    .put(
        ContactValidator,
        authMiddleware,
        editContactController
    )
export default router;