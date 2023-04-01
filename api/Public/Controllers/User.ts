import { Request, Response } from 'express';
import UserService from '../Services/User.js';
class User{

	static async all(req: Request, res: Response){
		try {
			const result = await UserService.all();
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

}

export default User;