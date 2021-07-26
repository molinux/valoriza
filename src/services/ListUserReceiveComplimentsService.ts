import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UsersRepository';

class ListUserReceiveComplimentsService {
	async execute(user_id: string) {
		const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
		const compliments = await complimentsRepositories.find({
			where: {
				user_receiver: user_id
			},
		});

		return compliments;
	}

}

export { ListUserReceiveComplimentsService };