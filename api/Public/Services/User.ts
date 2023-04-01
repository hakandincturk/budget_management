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

}

export default User;