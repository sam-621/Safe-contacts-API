import { Request, Response } from 'express';    
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs';
import pool from '../database/connection';
import { IUser } from '../models/users.models';
import { IPayload } from '../models/token.models';
import { secret_token } from '../config';

export async function registerController(req: Request, res: Response): Promise<Response> {

    const errorDataSchema = validationResult(req);
    if(!errorDataSchema.isEmpty()) {
        return res.json({
            error: errorDataSchema.array(),
            mesage: 'Wrong data schema'
        });
    }

    try {
        const { name, lastName, email, username, password }: IUser = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = {
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
        return res.json(error);
    }

}

export async function loginController(req: Request, res: Response): Promise<Response> {

    const errorDataSchema = validationResult(req);

    if(!errorDataSchema.isEmpty()) {
        return res.json({
            error: errorDataSchema.array(),
            message: 'wrong data schema'
        });
    }

    const { email, password }: IUser = req.body;
    try {
        const [user] = await pool.query<RowDataPacket[]>("SELECT * FROM Users WHERE email = ?", [email]);

        if(!user.length) {
            throw {
                error: true,
                message: 'no user founded'
            } 
        }

        if(! await bcrypt.compare(password, user[0].password)) {
            throw {
                error: true,
                message: 'passwords doesnt match'
            };
        }

        const payload: IPayload = {
            id: user[0].id,
            rol: user[0].rol
        }
        
        const token = await jwt.sign(payload, secret_token, /*{ expiresIn: '30min' }*/);

        return res.json({
            error: false,
            token: token,
            message: 'success'
        });

    } catch (error) {
        return res.json(error);
    }
}