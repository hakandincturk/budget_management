/* eslint-disable quotes */
/* eslint-disable max-len */
import 'dotenv';
import { Users } from '../../src/models/entities/Users.js';
import { dataSource } from '../../app.js';

import { Lang } from '../../src/config/enums.js';

class UserCard {

	static async all(userId: number, language: string){
		try {
			const userRepository = dataSource.getRepository(Users);
			const allUserCards = await userRepository.createQueryBuilder('user')
				.innerJoin('user.userCards', 'userCards')
				.select([ 'user.id', 'CONCAT("user"."firstName", "user"."surname") AS "user_fullName"', 'userCards.id', 'userCards.name', 'userCards.number', 'userCards.expire_date', 'userCards.ccv', 'userCards.limit', 'userCards.is_removed' ])
				// .addSelect("user.firstName || ' ' || user.lastName", 'user_fullName')
				.where('user.id = :userId', {userId})
				.andWhere('userCards.is_removed = :isRemoved', {isRemoved: false})
				.getOne();
			
			// const allUserCards = await userRepository.find(
			// 	{
			// 		select: {
			// 			id: true,
			// 			name: true,
			// 			surname: true,
			// 			userCards: true
			// 		},
			// 		relations: {
			// 			userCards: true
			// 		},
			// 		where: { id: userId }
			// 	}
			// );

			return { type: true, message: Lang[language].Users.info.get, data: allUserCards };
		}
		catch (error) {
			throw error;
		}
	}

}

export default UserCard;