import { Request, Response } from 'express';
import UserService from '../Services/User.js';

class User{

	/**
	 * User model
	 * @typedef {object} CreateUserRequest
	 * @property {string} name - The name
	 * @property {string} surname - The surname
	 * @property {string} email - The email
	 * @property {string} password - The password
	 * @property {string} phone_number - The phone number
	 */

	/**
	 * GET /user/
	 * @tags Users
	 * @summary get all user list
	 * @return { Array<CreateUserRequest> } 200 - Success message
	 */
	static async all(req: Request, res: Response){
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await UserService.all(language);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

	/**
	 * POST /user/
	 * @tags Users
	 * @summary create a new user
	 * @param { CreateUserRequest } request.body.required - User model
	 * @return { Array<CreateUserRequest> } 200 - Success message
	 */
	static async create(req: Request, res: Response){
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await UserService.create(req.body, language);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

}

export default User;