import moment, { months } from 'moment';

import { dataSource } from '../../app.js';
import { LessThanOrEqual, Raw } from 'typeorm';

import { Users } from '../../src/models/entities/Users.js';
import { Installments } from '../../src/models/entities/Installments.js';

import { Lang } from '../../src/config/enums.js';

import { DecodedObject } from '../../src/models/interfaces/IDecoded.js';

class Installment {

	static async dashboard(language: string, decoded: DecodedObject) {
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const currentDate = moment(new Date());
				console.log(currentDate);

				const user = await transactionManager.findOne(
					Users,
					{
						where: {
							id: decoded.id
						}
					}
				);

				if (!user) {
					return {type: false, message: Lang[language].Users.info.notFound};
				}

				const totalPaidAmount = await transactionManager.sum(Installments, 'amount', {
					is_removed: false,
					is_paid: true,
					paid_date: Raw((alias) => `${alias} < NOW()`),
					month: LessThanOrEqual(currentDate.month() + 1),
					year: currentDate.year(),
					outgoing: {
						user: user
					}
				});

				const nextMonthWillPay = await transactionManager.sum(Installments, 'amount', {
					is_removed: false,
					is_paid: false,
					month: currentDate.month() + 2,
					year: currentDate.year(),
					outgoing: {
						user: user
					}
				});

				const currentMonthPaid = await transactionManager.sum(Installments, 'amount', {
					is_removed: false,
					is_paid: true,
					month: currentDate.month() + 1,
					year: currentDate.year(),
					outgoing: {
						user: user
					}
				});

				console.log(totalPaidAmount, nextMonthWillPay, currentMonthPaid);
        
				return {type: true, message: Lang[language].Installments.info.gets, data: {
					totalPaidAmount: totalPaidAmount || 0,
					nextMonthWillPay: nextMonthWillPay || 0,
					currentMonthPaid: currentMonthPaid || 0
				}};
			});
			return res;
		}
		catch (error) {
			throw error;
		}
	}

}

export default Installment;