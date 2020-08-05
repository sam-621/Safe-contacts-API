import { Request, Response, NextFunction } from 'express';

export interface IRequest extends Request{
    user?: {
        id: string,
        rol: string
    }
}

export type Handler = (
    req: IRequest,
    res:  Response,
    next: NextFunction
) => Promise<Response | void>;