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
    
    try {
        const [contacts] = await pool.query<RowDataPacket[]>("SELECT * FROM Contacts WHERE user_id = ?", [req.user?.id]);

        if(!contacts.length) {
            throw{
                error: true,
                message: 'no contacts yet'
            }
        }

        return res.json({
            data: contacts
        });
        
    } catch (error) {
        return res.json(error);
    }
}

export async function getContactController(req: IRequest, res: Response): Promise<Response> {

    try {
        const { contactID } = req.params;

        const [contact] = await pool.query<RowDataPacket[]>("SELECT * FROM Contacts WHERE id = ?", [contactID]);

        if(!contact.length) {
            throw {
                error: true,
                message: 'No contact with that id'
            }
        }

        return res.json({
            error: false,
            data: contact
        });

    } catch (error) {
        return res.json(error);
    }
}

export async function editContactController(req: IRequest, res: Response): Promise<Response> {

    const errorDataSchema = validationResult(req);

    if(!errorDataSchema.isEmpty()) {
        return res.json({
            error: errorDataSchema.array(),
            message: 'wrong data schema'
        });
    }

    const userDataUpdated: IContacts = req.body;
    const { contactID } = req.params;
    const userID = req.user?.id;

    try {
        await pool.query("UPDATE Contacts SET ? WHERE id = ? AND user_id = ?", [userDataUpdated, contactID, userID]);

        return res.json({
            error: false,
            message: 'You have updated your contact successfully'
        });

    } catch (error) {
        return res.json(error);
    }
}

export async function deleteContact(req: IRequest, res: Response): Promise<Response> {

    const { contactID } = req.params;
    const userID = req.user?.id;

    try {
        await pool.query("DELETE FROM Contacts WHERE id = ? AND user_id = ?", [contactID, userID]);

        return res.json({
            error: false,
            message: 'you have deleted a contact'
        });
    } catch (error) {
        return res.json(error);   
    }

}