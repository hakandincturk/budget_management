import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { RolePermissions } from './RolePermissions.js';

@Entity('Permissions')
export class Permissions {

	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;
	
	@Column({name: 'is_removed', default: false})
		is_removed: boolean;

	@OneToMany(() => RolePermissions, rolePermissions => rolePermissions.permission)
		rolePermissions: RolePermissions[];

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}