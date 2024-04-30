import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { Users } from './Users.js';

@Entity('UserCards')
export class UserCards {

	@PrimaryGeneratedColumn()
		id: number;

	@Column('varchar', {nullable: false})
		name: string;
	
	@Column('varchar')
		number: string;

  @Column('varchar',) 
  	expire_date: string;

  @Column('int',) 
  	ccv: number;
	
	@Column('int', {nullable: false, default: 0}) 
  	limit: number;
	
	@Column('boolean', {name: 'is_removed', default: false, nullable: false})
		is_removed: boolean;

	@ManyToOne(() => Users, user => user.id)
	@JoinColumn({name: 'user_id'})
		user: Relation<Users>;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}