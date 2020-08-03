import { check } from 'express-validator';

export const registerValidator = [
    check('name', 'Insert a name').notEmpty().isString(),
    check('lastName', 'Insert a last name').notEmpty().isString(),
    check('email', 'insert a valid email').isEmail(),
    check('username', 'Insert a username').notEmpty().isString(),
    check('password', 'Insert at least 6 characters').notEmpty().isLength({ min: 6 })
]