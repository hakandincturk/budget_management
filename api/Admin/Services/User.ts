import 'dotenv';
import {Users} from '../../src/models/entities/Users.js';
import { dataSource } from '../../app.js';

import {encryptPassword} from '../../helpers/General.js';
import { Lang } from '../../src/config/enums.js';
import { IUserCreateBody } from '../../src/models/interfaces/IUser.js';

class User {
	
	static async all(language: string){
		try {
			const usersRepository = dataSource.getRepository(Users);
			const allUsers = await usersRepository.find({where: {is_removed: false}});

			return { type: true, message: Lang[language].Users.info.get, data: allUsers };
		}
		catch (error) {
			throw error;
		}
	}

	static async create(body: IUserCreateBody, language: string){
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const isUserExist = await transactionManager.findOne(Users, { where: { email: body.email } });
				if (isUserExist) {
					return { type: false, message: 'User already exist' };
				}	
	
				body.password = encryptPassword(body.password);
				body.user_type_id = 1;
				const newUser = await transactionManager.save(Users, body);
				
				return { type: true, message: Lang[language].Users.success.create, data: newUser };
			});
			return res;
			
		}
		catch (error) {
			throw error;
		}
	}

	static async delete(id: number, language: string){
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const user = await transactionManager.findOne(Users, { where: { id: id } });
				if (!user) {
					return { type: false, message: Lang[language].Users.info.notFound };
				}	
	
				user.is_removed = true;
				const newUser = await transactionManager.save(Users, user);
				
				return { type: true, message: Lang[language].Users.success.delete, data: newUser };
			});
			return res;
			
		}
		catch (error) {
			throw error;
		}
	}

}

export default User;