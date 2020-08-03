import { Request, Response } from 'express';    
import { validationResult } from 'express-validator';
import pool from '../database/connection';
import bcrypt from 'bcryptjs';
import { IregisterUser } from '../models/users.models';

export async function registerController(req: Request, res: Response): Promise<Response> {

    const errorDataSchema = validationResult(req);
    if(!errorDataSchema.isEmpty()) {
        return res.json({
            error: errorDataSchema.array(),
            mesage: 'Wrong data schema'
        });
    }

    try {
        const { name, lastName, email, username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IregisterUser = {
            name,
            lastName,
            email,
            username,
            password: hashedPassword
        };

        await pool.query("INSERT INTO Users SET ?", [newUser]);

        return res.json({
            error: false,
            message: 'You have created you account successfuly'
        });

    } catch (error) {
        return error;
    }

}