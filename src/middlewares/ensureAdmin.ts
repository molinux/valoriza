import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepository';

export async function ensureAdmin(request:Request, response:Response, next:NextFunction) {
  
	const { user_id } = request;
	console.log(user_id);

	const usersRepositories = getCustomRepository(UsersRepositories);

	const { admin } = await usersRepositories.findOne(user_id);
  
	// Verificar se o user é admin

	if(admin) {
		return next();
	}

	return response.status(401).json({
		error: 'Unauthorized'
	});
}