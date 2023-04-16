import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { RolePermissions } from './RolePermissions.js';

@Entity('Permissions')
export class Permissions {

	@PrimaryGeneratedColumn()
		id: number;

	@Column({nullable: false})
		name: string;
	
	@Column({nullable: false})
		clean_name: string;
	
	@Column({name: 'is_removed', default: false, nullable: false})
		is_removed: boolean;

	@OneToMany(() => RolePermissions, rolePermissions => rolePermissions.permission)
		rolePermissions: RolePermissions[];

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}