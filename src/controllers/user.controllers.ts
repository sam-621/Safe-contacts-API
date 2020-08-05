import { Response } from 'express';
import { IRequest } from '../models/middlewares.models';
import pool from '../database/connection';
import { IContacts } from '../models/contacts.models';
import { validationResult } from 'express-validator';
import { RowDataPacket } from 'mysql2';

export async function addContactsController(req: IRequest, res: Response): Promise<Response> {

    const errorDataSchema = validationResult(req); 
    if(!errorDataSchema.isEmpty()) {
        return res.json({
            error: errorDataSchema.array(),
            message: 'Wrong data schema'
        });
    }
    
    try {

        const { name, lastName, tel, email }: IContacts = req.body;
        const newContact: IContacts = {
            name,
            lastName,
            tel,
            email,
            user_id: req.user?.id
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

export async function getContactsController(req: IRequest, res: Response): Promise<Response> {

    const errorDataSchema = validationResult(req); 
    if(!errorDataSchema.isEmpty()) {
        return res.json({
            error: errorDataSchema.array(),
            message: 'Wrong data schema'
        });
    }
    
    try {
        const [contacts] = await pool.query<RowDataPacket[]>("SELECT * FROM Contacts WHERE user_id = ?", [req.user?.id]);

        return res.json({
            data: contacts
        });
    } catch (error) {
        return res.json(error)
    }
}