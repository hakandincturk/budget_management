import 'dotenv';
import md5 from 'md5';
import {Users} from '../../src/models/entities/Users.js';
import { dataSource } from '../../app.js';

import { Lang } from '../../src/config/enums.js';

class User {
	
	static async all(language: string){
		try {
			const usersRepository = dataSource.getRepository(Users);
			const allUsers = await usersRepository.find();

			return { type: true, message: Lang[language].Users.info.get, data: allUsers };
		}
		catch (error) {
			throw error;
		}
	}

	static async create(user: Users, language: string){
		try {
			const usersRepository = dataSource.getRepository(Users);
			const isUserExist = await usersRepository.findOne({ where: { email: user.email } });
			if (isUserExist) {
				return { type: false, message: 'User already exist' };
			}	
			const passwordSalt: string = process.env.PASSWORD_SALT || '';
			user.password = md5(md5(user.password) + md5(passwordSalt));
			const newUser = await usersRepository.save(user);
			
			return { type: true, message: Lang[language].Users.success.create, data: newUser };
		}
		catch (error) {
			throw error;
		}
	}

}

export default User;