import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm';

import { Roles } from './Roles.js';
import { Permissions } from './Permissions.js';

@Entity('RolePermissions')
export class RolePermissions {

	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		isActive: boolean;

	@ManyToOne(() => Roles, role => role.rolePermissions)
		role: Roles;

	@ManyToOne(() => Permissions, permissions => permissions.rolePermissions)
		permission: Permissions;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}