import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { Outgoings } from './Outgoings.js';

@Entity('Installments')
export class Installments {

	@PrimaryGeneratedColumn()
		id: number;

	@ManyToOne(() => Outgoings, outgoing => outgoing.id)
	@JoinColumn({name: 'outgoing_id'})
		outgoing: Relation<Outgoings>;

	@Column({type: 'float', nullable: false})
		amount: number;

	@Column({type: 'float', nullable: false})
		total_amount: number;

  @Column({nullable: false}) 
  	installment: number;

  @Column({nullable: false}) 
  	total_installment_count: number;

  @Column({nullable: false}) 
  	month: number;

  @Column({nullable: false}) 
  	year: number;
	
	@Column({name: 'is_paid', default: false, nullable: false}) 
  	is_paid: boolean;

	@Column({nullable: true}) 
		paid_date: Date;
	
	@Column({name: 'is_removed', default: false, nullable: false})
		is_removed: boolean;

	@CreateDateColumn({default: new Date()}) 
		createdAt: Date;

	@CreateDateColumn({default: new Date()})
		updatedAt: Date;

}