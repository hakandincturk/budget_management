import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm'; 

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

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}