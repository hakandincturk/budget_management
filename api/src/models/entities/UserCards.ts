import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { Users } from './Users.js';

@Entity('UserCards')
export class UserCards {

	@PrimaryGeneratedColumn()
		id: number;

	@Column({nullable: false})
		name: string;
	
	@Column()
		number: string;

  @Column() 
  	expire_date: string;

  @Column() 
  	ccv: number;
	
	@Column({nullable: false, default: 0}) 
  	limit: number;
	
	@Column({name: 'is_removed', default: false, nullable: false})
		is_removed: boolean;

	@ManyToOne(() => Users, user => user.id)
		user: Relation<Users>;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}