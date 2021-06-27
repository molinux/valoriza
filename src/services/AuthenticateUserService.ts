import { getCustomRepository } from "typeorm";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersRepositories } from "../repositories/UsersRepository";


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {
    
    // Verificar se o email existe
    const usersRepository = getCustomRepository(UsersRepositories);
    
    const user = await usersRepository.findOne({
      email
    });
    
    if(!user) {
      throw new Error("Email/Password incorrect");
    }
    
    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect");
      
    }

    // Gerar o token
    const token = sign({
      email: user.email
      }, "184cfbdf777e054e7cdafb6cd36ce3f7", {
        subject : user.id,
        expiresIn: "1d" 
      }
    );

    return token;
  }
}

export { AuthenticateUserService };