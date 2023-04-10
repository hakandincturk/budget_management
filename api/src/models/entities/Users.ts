import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from 'typeorm'; 

import { UserRoles } from './UserRoles.js';

@Entity({name: 'Users'}) 
export class Users {   

	@PrimaryGeneratedColumn({type: 'bigint'}) 
		id: number; 

	@Column() 
		name: string; 

	@Column() 
		surname: string; 

	@Column() 
		email: string;
		
	@Column() 
		password: string;

	@Column({nullable: true}) 
		phone_number: string;

	@Column('boolean', {nullable: false, default: false}) 
		is_removed: boolean;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

	@OneToMany(() => UserRoles, userRoles => userRoles.user, {cascade: true})
		userRoles: UserRoles[];

}