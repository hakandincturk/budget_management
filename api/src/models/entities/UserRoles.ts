import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, Relation
} from 'typeorm';

import { Roles } from './Roles.js';
import { Users } from './Users.js';

@Entity('UserRoles')
export class UserRoles {

	@PrimaryGeneratedColumn()
		id: number;

	@Column({name: 'is_removed', default: false})
		is_removed: boolean;

	@ManyToOne(() => Roles, role => role.userRoles)
		role: Relation<Roles>;

	@ManyToOne(() => Users, users => users.userRoles)
		user: Relation<Users>;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}