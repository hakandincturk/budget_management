import { Request, Response } from 'express';
import UserCardService from '../Services/UserCard.js';

import { IUserCardCreateBody } from '../../src/models/interfaces/IUserCards.js';
import { IResponseBody } from '../../src/models/interfaces/IResponseBody.js';

class UserCard {

	/**
	 * User model
	 * @typedef {object} CreateUserCardRequest
	 * @property {string} name - The name
	 * @property {string} number - The surname
	 * @property {string} expire_date - The email
	 * @property {number} ccv - The password
	 * @property {number} limit - The phone number
	 */

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

	/**
	 * POST /private/usercard/
	 * @tags Private/User Cards
	 * @summary delete for logged in user
	 * @param { CreateUserCardRequest } request.body.required - user card
	 * @security JWT
	 */
	static async create(req: Request<IUserCardCreateBody>, res: Response<IResponseBody>){
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await UserCardService.create(req.body, req.decoded.id, language);
			return res.json({ type: true, message: result.message });
		}
		catch (error) {
			throw error;
		}
	}
	
	/**
	 * DELETE /private/usercard/{card_id}
	 * @tags Private/User Cards
	 * @summary delete for logged in user
	 * @param { number } card_id.path.required - The card id
	 * @security JWT
	 */
	static async delete(req: Request, res: Response<IResponseBody>){
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await UserCardService.delete(Number(req.params.card_id), req.decoded.id, language);
			return res.json({ type: true, message: result.message });
		}
		catch (error) {
			throw error;
		}
	}

}

export default UserCard;