import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { RolePermissions } from './RolePermissions.js';

@Entity('Roles')
export class Roles {

	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;

	@Column({name: 'is_removed'})
		is_removed: boolean;

	@OneToMany(() => RolePermissions, userGroup => userGroup.role)
		rolePermissions: RolePermissions[];

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}

