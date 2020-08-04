import { Router } from 'express';
const router = Router();
import { registerController, loginController } from '../controllers/auth.controllers';
import { registerValidator, loginValidator } from '../validators/user.validator';

router.post(
    '/register',
    registerValidator,
    registerController
)

router.post(
    '/login',
    loginValidator,
    loginController  
);

export default router