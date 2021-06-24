import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from "../repositories/UsersRepository";

interface IUserRequest {
  name: string,
  email: string,
  admin?: boolean
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    // Verifica se o email está preenchido
    if(!email) {
      throw new Error("Email incorrect");
    }

    // Verifica se o usuário já existe
    const userAlreadyExists = await usersRepository.findOne({
      email
    });

    if(userAlreadyExists) {
      throw new Error("User already exists");
    }

    // Cria o usuario
    const user = usersRepository.create({
      name,
      email,
      admin
    });

    // Salva no banco de dados
    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService }