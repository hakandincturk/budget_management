import { Request, Response } from 'express';
import OutgoingService from '../Services/Outgoing.js';

import { IOutgoingCreateBody } from '../../src/models/interfaces/Outgoings';
import { IResponseBody } from '../../src/models/interfaces/IResponseBody.js';

class Outgoing{

	/**
	 * User model
	 * @typedef {object} CreateOutgoingRequest
	 * @property {number} userId
	 * @property {number} userCardId
	 * @property {string} purchase_date
	 * @property {number} total_amount
	 * @property {number} total_installment_count
	 * @property {boolean} is_paid
	 * @property {string} paid_date
	 */

	/**
	 * POST /private/outgoing/
	 * @tags Private/Outgoing
	 * @summary get all cards belongs to user
	 * @param {CreateOutgoingRequest} request.body.required - user card
	 * @security JWT
	 */
	static async create (req: Request<IOutgoingCreateBody>, res: Response<IResponseBody>) {
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await OutgoingService.create(req.body, language);
			if (!result.type) {
				return {type: false, message: result.message};
			}
			return res.json({ type: true, message: result.message });
		}
		catch (error) {
			throw error;
		}
	}

}
export default Outgoing;