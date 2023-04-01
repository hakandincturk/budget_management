import { Request, Response } from 'express';
import UserService from '../Services/User.js';
class User{

	/**
	 * A song type
	 * @typedef {object} Song
	 * @property {string} title.required - The title
	 * @property {string} artist - The artist
	 * @property {number} year - The year - double
	 */

	/**
	 * GET /user/
	 * @tags Users
	 * @summary summary
	 * @returns { object } 200 - Success message
	 * @returns { Error } default - Unexpected error
	 */
	static async all(req: Request, res: Response){
		try {
			const result = await UserService.all();
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

	static async create(req: Request, res: Response){
		try {
			const result = await UserService.create(req.body);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

}

export default User;