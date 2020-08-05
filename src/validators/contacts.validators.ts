import { check, ValidationChain } from 'express-validator';

export const ContactValidator: ValidationChain[] = [
    check('name', 'Insert a name').notEmpty().isString(),
    check('lastName', 'Insert a last name').notEmpty().isString(),
    check('tel', 'insert a valid number of phone').notEmpty().isMobilePhone("es-MX"),
    check('email', 'insert a valid email').isEmail(),
]