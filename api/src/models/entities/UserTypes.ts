import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserTypes')
export class UserTypes {

	@PrimaryGeneratedColumn()
		id: number;
  
  @Column('varchar', {nullable: false})
  	name: string;

	@Column('int', {default: 1})
  	type: number;

	@Column('boolean', {name: 'is_removed', default: false})
		is_removed: boolean;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}