import moment from 'moment';

import { dataSource } from '../../app.js';

import { Outgoings } from '../../src/models/entities/Outgoings.js';
import { Installments } from '../../src/models/entities/Installments.js';

import { IInstallmentPayBody } from '../../src/models/interfaces/IInstallments.js';

import { Lang } from '../../src/config/enums.js';
import { Users } from '../../src/models/entities/Users.js';
import { DecodedObject } from '../../src/models/interfaces/IDecoded.js';

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

	static async specificMonth(month: number, year: number, language: string, decoded: DecodedObject) {
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
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
							outgoing: {
								user: user
							},
							month: month,
							year: year,
							is_removed: false
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

	static async pay(body: IInstallmentPayBody, language: string) {
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const installemnt = await transactionManager.findOne(
					Installments, {
						select: [
							'id',
							'installment',
							'total_installment_count',
							'outgoing'
						],
						relations: {
							outgoing: true
						},
						where: {
							id: body.id
						}
					}
				);

				if (!installemnt) {
					return {type: false, message: Lang[language].Installments.error.notFound};
				}

				await transactionManager.update(
					Installments,
					{ id: body.id }, 
					{ is_paid: true, paid_date: body.date }
				);

				if (installemnt.installment === installemnt.total_installment_count) {
					await transactionManager.update(
						Outgoings,
						{ id: installemnt.outgoing.id }, 
						{ is_paid: true, paid_date: body.date }
					);
				}

				return {type: true, message: Lang[language].Installments.success.paid};
			});
			return res;
		}
		catch (error) {
			throw error;
		}
	}

}

export default Installment;