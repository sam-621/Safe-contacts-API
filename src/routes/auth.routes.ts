import { Router } from 'express';
const router = Router();
import { registerController } from '../controllers/auth.controller';
import { registerValidator } from '../validators/user.validator';

router.post(
    '/register',
    registerValidator,
    registerController
)

export default router