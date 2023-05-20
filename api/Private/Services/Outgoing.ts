import moment from 'moment';

import { Users } from '../../src/models/entities/Users.js';
import { UserCards } from '../../src/models/entities/UserCards.js';
import { Outgoings } from '../../src/models/entities/Outgoings.js';
import { Installments } from '../../src/models/entities/Installments.js';

import { IOutgoingCreateBody } from '../../src/models/interfaces/IOutgoings.js';

import { dataSource } from '../../app.js';

import { Lang } from '../../src/config/enums.js';

class Outgoing{

	static async create (body: IOutgoingCreateBody, language: string) {
		try {
			console.log(body);
			console.log('body.userId -->', body.userId);
			
			const res = await dataSource.transaction(async (transactionManager) => {
				const user = await transactionManager.findOne(
					Users, {
						where: {
							id: body.userId,
							is_removed: false
						}, 
						select: {
							id: true
						}
					}
				);
				if (!user) { // kullanici var mi yok mu kontrolu (baska biri icin borc yaratabilir)
					return { type: false, message: Lang[language].Users.info.notFound};
				}

				const userCard = await transactionManager.findOne(
					UserCards, {
						where: {
							id: body.userCardId,
							is_removed: false
						},
						select: {
							id: true
						}
					}
				);
				if (!userCard) { // kart var mi yok mu kontrol
					return { type: false, message: Lang[language].UserCards.info.notFound};
				}

				const outgoingBody = {
					user: user,
					userCard: userCard,
					total_amount: body.total_amount,
					monthly_amount: body.total_amount,
					total_installment_count: 0,
					is_paid: body.is_paid || false,
					paid_date: body.paid_date ? body.paid_date : new Date('1-1-2000'),
					purchase_date: new Date(body.purchase_date) || null,
					description: body.description
				};
				console.log('body.total_installment_count -->', body.purchase_date);
				const startDate = moment(new Date(body.purchase_date));
				console.log('startDate -->', startDate);
				console.log('month -->', startDate.month());

				if (body.total_installment_count === 0) { // guncel ay icin borc
					console.log(1);
					
					const createOutgoing = await transactionManager.save(Outgoings, outgoingBody);
					console.log(2);

					const installmentBody = {
						outgoing: createOutgoing,
						amount: Number(body.total_amount),
						total_amount: Number(body.total_amount),
						installment: 0,
						total_installment_count: 0,
						month: startDate.month() + 1,
						year: startDate.year(),
						is_paid: body.is_paid || false,
						paid_date: body.paid_date ? body.paid_date : new Date('1-1-2000')
					};
					console.log('installmentBody -->', installmentBody);

					await transactionManager.save(Installments, installmentBody);
					console.log(4);

				}
				else if (body.total_installment_count === 1) { // bir sonra ki ay icin borc
					const createOutgoing = await transactionManager.save(Outgoings, outgoingBody);

					const installmentBody = {
						outgoing: createOutgoing,
						amount: body.total_amount,
						total_amount: body.total_amount,
						installment: 0,
						total_installment_count: 0,
						month: startDate.month() + 1,
						year: startDate.year(),
						is_paid: body.is_paid || false,
						paid_date: body.paid_date ? body.paid_date : new Date('1-1-2000')
					};

					await transactionManager.save(Installments, installmentBody);
				}
				else { // taksitli borc
					const monthly_amount = Number((body.total_amount / body.total_installment_count).toFixed(2));

					outgoingBody.monthly_amount = monthly_amount;

					outgoingBody.total_installment_count = body.total_installment_count;

					const createOutgoing = await transactionManager.save(Outgoings, outgoingBody);

					// eger odeme bu aydan basliyorsa burayi ac
					// if (body.start_this_month) {  
					// 	startDate = startDate.subtract(1, 'M');
					// }

					const installmentBody = [];
					for (let i = 1;i <= body.total_installment_count;i++) {
						const installmentDate = moment(startDate).add(i, 'M');
						const newBody = {
							outgoing: createOutgoing,
							amount: monthly_amount,
							total_amount: body.total_amount,
							installment: i,
							total_installment_count: body.total_installment_count,
							month: installmentDate.month() + 1,
							year: installmentDate.year(),
							is_paid: false,
							paid_date: new Date('1-1-2000')
						};

						installmentBody.push(newBody);
					}
					await transactionManager.save(Installments, installmentBody);
				}

				return { type: true, message: Lang[language].Outgoings.success.create};
			});
			return res;
		}
		catch (error) {
			throw error;
		}
	}

	static async all(userId: number, language: string) {
		try {
			const res = await dataSource.transaction(async (transactionManager) => {

				const user = await transactionManager.findOne(Users, {where: {id: userId}});
				if (!user) { // kullanici var mi yok mu kontrolu
					return { type: false, message: Lang[language].Users.info.notFound};
				}

				const outgoingRepo = transactionManager.getRepository(Outgoings);
				const result = await outgoingRepo.createQueryBuilder('outgoing')
					.innerJoin('outgoing.userCard', 'userCard')
					.andWhere('outgoing.user = :userId', {userId: userId})
					.andWhere('outgoing.is_removed = :is_removed', {is_removed: false})
					.select([
						'outgoing.id',
						'outgoing.total_amount',
						'outgoing.monthly_amount',
						'outgoing.total_installment_count',
						'outgoing.is_paid',
						'outgoing.paid_date',
						'outgoing.purchase_date',
						'outgoing.description',
						'userCard.id',
						'userCard.name'
					])
					.orderBy('outgoing.createdAt', 'DESC')
					.getMany();

				return {type: true, message: Lang[language].Outgoings.info.get, data: result};
			});

			return res;
		}
		catch (error) {
			throw error;
		}
	}

	static async installments(id: number, language: string) {
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const result = await transactionManager.findOne(
					Outgoings,
					{
						relations: {
							installment: true
						},
						order: {
							installment: {
								installment: 'ASC'
							}
						},
						where: {
							id: id,
							is_removed: false,
							installment: {
								is_removed: false
							}
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

	static async delete(id: number, userId: number, language: string){
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const user = await transactionManager.findOne(Users, { where: { id: userId } });
				if (!user) {
					return { type: false, message: Lang[language].Users.info.notFound };
				}	

				const outgoing = await transactionManager.findOne(Outgoings, { where: { id: id } });
				if (!outgoing) {
					return { type: false, message: Lang[language].Outgoings.info.notFound };
				}

				await transactionManager.update(
					Installments, 
					{
						outgoing: outgoing
					},
					{ is_removed: true }
				); 
	
				outgoing.is_removed = true;
				await transactionManager.save(Outgoings, outgoing);
				
				return { type: true, message: Lang[language].Outgoings.success.delete};
			});
			return res;
			
		}
		catch (error) {
			throw error;
		}
	}

}

export default Outgoing;