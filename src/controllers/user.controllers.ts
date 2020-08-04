import { Request, Response } from 'express';
import pool from '../database/connection';
import { verify } from 'jsonwebtoken';
import { secret_token } from '../config';
import { IContacts } from '../models/contacts.models';
import { IDecoded } from '../models/token.models';
import { validationResult } from 'express-validator';

export async function addContactsController(req: Request, res: Response): Promise<Response> {

    const errorDataSchema = validationResult(req); 
    if(!errorDataSchema.isEmpty()) {
        return res.json({
            error: errorDataSchema.array(),
            message: 'Wrong data schema'
        });
    }

    const token = req.headers.authorization as string;

    try {
        const decoded = verify(token, secret_token) as IDecoded;

        const { name, lastName, tel, email }: IContacts = req.body;
        const newContact: IContacts = {
            name,
            lastName,
            tel,
            email,
            user_id: decoded.id
        }

        await pool.query("INSERT INTO Contacts SET ?", [newContact]);

        return res.json({
            err: false,
            message: 'You have add a contact successfully :)'   
        });

    } catch (error) {
        return res.json(error);
    }
}