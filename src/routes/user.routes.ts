import { Router } from 'express';
const router = Router();
import { addContactsController } from '../controllers/user.controllers';
import { AddContactValidator } from '../validators/contacts.validators';

router.post(
    '/add',
    AddContactValidator,
    addContactsController //Verify the token schema in console
)

export default router;