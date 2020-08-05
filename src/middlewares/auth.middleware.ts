import { verify } from 'jsonwebtoken';
import { secret_token } from '../config';
import { IDecoded } from '../models/token.models';
import { RowDataPacket } from 'mysql2';
import pool from '../database/connection'
import { Handler } from '../models/middlewares.models';

const authMiddleware: Handler = async (req, res, next) => {
    const token = req.headers.authorization as string;

    if(!token) {
        return res.json({
            error: true,
            message: 'no token provided' 
        });
    }

    try {
        const decoded = verify(token, secret_token) as IDecoded;

        const [user] = await pool.query<RowDataPacket[]>("SELECT * FROM Users WHERE id = ?", [decoded.id]);

        if(!user.length) {
            return res.json({
                error: true,
                message: 'What are you trying'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.json(error)
    }
}

export default authMiddleware;