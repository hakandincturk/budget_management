import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserTypes')
export class UserTypes {

	@PrimaryGeneratedColumn()
		id: number;
  
  @Column({nullable: false})
  	name: string;

	@Column({default: 1})
  	type: number;

	@Column({name: 'is_removed', default: false})
		is_removed: boolean;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}