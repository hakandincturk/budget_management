/* eslint-disable max-len */
import { Request, Response } from 'express';

import InitService from '../Services/Init.js';

import { IResponseBody } from '../../src/models/interfaces/IResponseBody';

/**
 * @typedef {object} PayInstallmentBody
 * @property { number } id
 * @property { string } date
*/

class Installment {

	/**
	 * GET /private/init/dashboard
	 * @tags Private/Installment
	 * @summary get dashboard data
	 * @security JWT
	 */
	static async dashboard(req: Request, res: Response<IResponseBody>) {
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await InitService.dashboard(language, req.decoded);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

}

export default Installment;