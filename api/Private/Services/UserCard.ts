/* eslint-disable max-len */
import { Users } from '../../src/models/entities/Users.js';
import { UserCards } from '../../src/models/entities/UserCards.js';

import { dataSource } from '../../app.js';

import { Lang } from '../../src/config/enums.js';
import { IUserCardCreateBody } from '../../src/models/interfaces/UserCards.js';

class UserCard {

	static async all(userId: number, language: string){
		try {
			const userRepository = dataSource.getRepository(Users);
			const allUserCards = await userRepository.createQueryBuilder('user')
				.innerJoin('user.userCards', 'userCards')
				.select([ 
					'user.id',
					'user.fullName',
					'userCards.id',
					'userCards.name',
					'userCards.number',
					'userCards.expire_date',
					'userCards.ccv',
					'userCards.limit',
					'userCards.is_removed'
				])
				.where('user.id = :userId', {userId})
				.andWhere('userCards.is_removed = :isRemoved', {isRemoved: false})
				.getOne();

			return { type: true, message: Lang[language].Users.info.get, data: allUserCards };
		}
		catch (error) {
			throw error;
		}
	}

	static async create(body: IUserCardCreateBody, userId: number, language: string){
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const user = await transactionManager.findOne(Users, {where: {id: userId, is_removed: false}});
				if (!user) {
					return { type: false, message: Lang[language].Users.info.notFound};
				}

				const createUserCard = await transactionManager.insert(UserCards, {
					name: body.name,
					number: body.number,
					expire_date: body.expire_date,
					ccv: body.ccv,
					limit: body.limit,
					user: user
				});

				if (!createUserCard) {
					return { type: false, message: Lang[language].UserCards.error.create};					
				}
				return { type: true, message: Lang[language].UserCards.success.create};
			});
			return res;
		}
		catch (error) {
			throw error;
		}		
	}

	static async delete (cardId: number, userId: number, language: string){
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const user = await transactionManager.findOne(Users, {where: {id: userId, is_removed: false}});
				if (!user) {
					return { type: false, message: Lang[language].Users.info.notFound};
				}

				const userCard = await transactionManager.findOne(UserCards, {where: {id: cardId, is_removed: false}});
				if (!userCard) {
					return { type: false, message: Lang[language].UserCards.info.notFound};
				}

				await transactionManager.update(UserCards, {id: cardId, user}, {is_removed: true});
				return { type: true, message: Lang[language].UserCards.success.delete};
			});
			return res;
		}
		catch (error) {	
			throw error;
		}
	}

}

export default UserCard;