import 'dotenv';
import jwt from 'jsonwebtoken';
import {Users} from '../../src/models/entities/Users.js';
import { dataSource } from '../../app.js';
import { IAuthLoginBody } from '../../src/models/interfaces/IAuthLoginBody.js';

import { encryptPassword } from '../../helpers/General.js';
import { Lang } from '../../src/config/enums.js';

class Auth {
	
	static async login(body: IAuthLoginBody, language: string){
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const result = await transactionManager.createQueryBuilder(Users, 'user')
					.innerJoinAndSelect(
						'user.userRoles', 'userRoles',
						'userRoles.is_removed = :roleIsRemoved', {roleIsRemoved: false})
					.innerJoin('userRoles.role', 'role')
					.andWhere('user.email = :email', {email: body.email})
					.andWhere('user.password = :password', {password: encryptPassword(body.password)})
					.andWhere('user.is_removed = :is_removed', {is_removed: false})
					.select([
						'user.id',
						'user.name',
						'user.surname',
						'user.email',
						'userRoles.id',
						'role.name',
						'role.clean_name'
					])
					.getOne();

				if (!result) {
					return { 
						type: false, 
						message: Lang[language].Auth.error.wrongEmail
					};
				}
	
				const decode = {
					user_id: result.id,
					name: `${result.name} ${result.surname}`
				};
				
				const TOKEN_SECRET = (process.env.TOKEN_SECRET)?.toString() || '123456';
	
				const token = jwt.sign(decode, TOKEN_SECRET, {expiresIn: '1days'});
	
				return { 
					type: true,
					message: Lang[language].Auth.success.login, 
					data: {
						token: token,
						roles: result.userRoles
					}
				};
			});
			return res;
		}
		catch (error) {
			throw error;
		}
	}

}

export default Auth;