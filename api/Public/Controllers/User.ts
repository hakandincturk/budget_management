import { Request, Response } from 'express';
import UserService from '../Services/User.js';

import { LanguageIndex } from '../../src/config/enums.js';

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
	 * @returns { object } 200 - Success message
	 * @returns { Error } default - Unexpected error
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
	 * @returns { object } 200 - Success message
	 * @returns { Error } default - Unexpected error
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