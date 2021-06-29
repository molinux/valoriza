import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request : Request, 
  response : Response, 
  next : NextFunction
) {
  // Receber o token
  const authToken = request.headers.authorization

  // Validar o token está preenchido
  // .end() = pega a mensagem padrão do status
  if(!authToken) {
    return response.status(401).end();
  }

  const [,token] = authToken.split(" ");

  // Validar se o token é válido
  try {
    const { sub } = verify(token, "184cfbdf777e054e7cdafb6cd36ce3f7") as IPayload;

    // Recuperar informações do usuário
    request.user_id = sub; 
    
    return next();
  } catch (error) {
    return response.status(401).end();
  }
  
  
}