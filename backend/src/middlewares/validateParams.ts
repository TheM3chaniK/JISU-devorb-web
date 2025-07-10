import { NextFunction, Request, Response } from "express";
const combineParams = (req:Request) => ({ ...req.body, ...req.params, ...req.query });

export const validateParams = (requiredParams:string[]) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const allParams = combineParams(req);
        const missingParams = requiredParams.filter(param => allParams[param] === undefined);

        if (missingParams.length > 0) {
            return res.status(400).json({
                message: 'Missing required parameters',
                missingParameters: missingParams
            });
        }
        next();
    };
}

export const validateAnyParam = (requiredParams:string[]) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const allParams = combineParams(req);
        const hasAnyParam = requiredParams.some(param => allParams[param] !== undefined);

        if (!hasAnyParam) {
            return res.status(400).json({
                message: 'At least one required parameter must be provided',
                avaialbleParameters:allParams
            });
        }
        next();
    };
}
