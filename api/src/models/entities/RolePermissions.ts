import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, Relation
} from 'typeorm';

import { Roles } from './Roles.js';
import { Permissions } from './Permissions.js';

@Entity('RolePermissions')
export class RolePermissions {

	@PrimaryGeneratedColumn()
		id: number;

	@Column('boolean', {name: 'is_removed', default: false})
		is_removed: boolean;

	@ManyToOne(() => Roles, role => role.rolePermissions)
		role: Relation<Roles>;

	@ManyToOne(() => Permissions, permissions => permissions.rolePermissions)
		permission: Relation<Permissions>;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}