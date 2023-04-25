import moment from 'moment';

import { dataSource } from '../../app.js';

import { Outgoings } from '../../src/models/entities/Outgoings.js';
import { Installments } from '../../src/models/entities/Installments.js';

import { Lang } from '../../src/config/enums.js';

class Installment {

	static async currentMonth(language: string) {
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const currentDate = moment(new Date());

				const result = await transactionManager.find(
					Installments,
					{
						relations: {
							outgoing: {
								user: true,
								userCard: true
							}
						},
						where: {
							month: currentDate.month() + 1,
							year: currentDate.year()
						}
					}
				);

				return {type: true, message: Lang[language].Installments.info.gets, data: result};
			});
			return res;
		}
		catch (error) {
			throw error;
		}
	}

	static async specificMonth(month: number, year: number, language: string) {
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const result = await transactionManager.find(
					Installments,
					{
						relations: {
							outgoing: {
								user: true,
								userCard: true
							}
						},
						where: {
							month: month,
							year: year
						}
					}
				);

				return {type: true, message: Lang[language].Installments.info.gets, data: result};
			});
			return res;
		}
		catch (error) {
			throw error;
		}
	}

}

export default Installment;