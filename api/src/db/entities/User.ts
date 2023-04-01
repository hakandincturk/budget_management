import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'; 

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

	@Column('date', {default: new Date()}) 
		createdAt: Date;

	@Column('date', {default: new Date()})
		updatedAt: Date;

}