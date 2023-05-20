import { Request, Response } from 'express';
import OutgoingService from '../Services/Outgoing.js';

import { IOutgoingCreateBody } from '../../src/models/interfaces/IOutgoings.js';
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
	 * @property {string} description
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

	/**
	 * GET /private/outgoing/
	 * @tags Private/Outgoing
	 * @summary get all outgoings belongs to user
	 * @security JWT
	 */
	static async all (req: Request, res: Response<IResponseBody>) {
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await OutgoingService.all(req.decoded.id, language);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

	/**
	 * GET /private/outgoing/installments/{id}
	 * @tags Private/Outgoing
	 * @summary get all installment belongs to outgoing
	 * @param {number} id.path.required - outgoing
	 * @security JWT
	 */
	static async installments (req: Request, res: Response<IResponseBody>) {
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await OutgoingService.installments(Number(req.params.id), language);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

	/**
	 * DELETE /private/outgoing/{id}
	 * @tags Private/Outgoing
	 * @summary delete outgoing
	 * @param {number} id.path.required - outgoing
	 * @security JWT
	 */
	static async delete (req: Request, res: Response<IResponseBody>) {
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await OutgoingService.delete(Number(req.params.id), Number(req.decoded.id), language);
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