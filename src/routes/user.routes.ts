import { Router } from 'express';
import {
    addContactsController, 
    getContactsController,
    getContactController,
    editContactController,
    deleteContact
} from '../controllers/user.controllers';
import { ContactValidator } from '../validators/contacts.validators';
import authMiddleware from '../middlewares/auth.middleware';
const router = Router();

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
    .delete(
        authMiddleware,
        deleteContact
    )
export default router;