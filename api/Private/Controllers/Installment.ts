/* eslint-disable max-len */
import { Request, Response } from 'express';

import InstallmentService from '../Services/Installment.js';

import { IResponseBody } from '../../src/models/interfaces/IResponseBody';

class Installment {

	/**
	 * GET /private/installment/currentMonth
	 * @tags Private/Installment
	 * @summary get monthly installment
	 * @security JWT
	 */
	static async currentMonth(req: Request, res: Response<IResponseBody>) {
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await InstallmentService.currentMonth(language);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

	/**
	 * GET /private/installment/specificMonth/{year}/{month}
	 * @tags Private/Installment
	 * @summary get monthly installment
	 * @param {number} year.path.required
	 * @param {number} month.path.required
	 * @security JWT
	 */
	static async specificMonth(req: Request, res: Response<IResponseBody>) {
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await InstallmentService.specificMonth(Number(req.params.month), Number(req.params.year), language);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

}

export default Installment;