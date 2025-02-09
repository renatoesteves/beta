import {NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string,

}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
   //Receber o Token 
   const authToken = req.headers.authorization

   if(!authToken){
    res.status(401).end();

}

const [, token] = authToken.split(" ")
    try{
        //Validar o token 
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;

        //Recuperar o ID do token e colocar dentro de uma variavel user_id dentro do req(Request)
        req.user_id = sub;
         next();

    }catch{
         res.status(401).end();
    }
}