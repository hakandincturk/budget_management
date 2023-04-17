import { Request, Response } from 'express';
import UserCardService from '../Services/UserCard.js';

class UserCard {

	/**
	 * GET /private/usercard/
	 * @tags Private/User Cards
	 * @summary get all cards belongs to user
	 * @security JWT
	 */
	static async all(req: Request, res: Response){
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await UserCardService.all(req.decoded.id, language);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

}

export default UserCard;