import { Router } from 'express';
import { registerController, loginController } from '../controllers/auth.controllers';
import { registerValidator, loginValidator } from '../validators/user.validator';
const router = Router();

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