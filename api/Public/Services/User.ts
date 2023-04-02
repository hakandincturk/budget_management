import 'dotenv';
import md5 from 'md5';
import {Users} from '../../src/models/entities/Users.js';
import { dataSource } from '../../app.js';

class User {
	
	static async all(){
		try {
			const usersRepository = dataSource.getRepository(Users);
			const allUsers = await usersRepository.find();
			
			return { type: true, message: 'All Users', data: allUsers };
		}
		catch (error) {
			throw error;
		}
	}

	static async create(user: Users){
		try {

			console.log('user --> ', user);

			const usersRepository = dataSource.getRepository(Users);
			const isUserExist = await usersRepository.findOne({ where: { email: user.email } });
			if (isUserExist) {
				return { type: false, message: 'User already exist' };
			}	
			const passwordSalt: string = process.env.PASSWORD_SALT || '';
			user.password = md5(md5(user.password) + md5(passwordSalt));
			const newUser = await usersRepository.save(user);
			
			return { type: true, message: 'User created', data: newUser };
		}
		catch (error) {
			throw error;
		}
	}

}

export default User;