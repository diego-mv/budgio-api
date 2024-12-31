import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'
import { ICreditCard } from '../../models/entities/credit-card.entity'

@Entity('CreditCard')
export class CreditCard implements ICreditCard {
	@PrimaryColumn({ length: 64, name: 'Id' })
	id: string

	@Column({ type: 'numeric', name: 'CreditLimit' })
	creditLimit: number

	@Column({ length: 64, name: 'Name' })
	name: string

	@Column({ length: 6, default: '007A33', name: 'Color' })
	color: string

	@Column({ type: 'date', name: 'DueDate' })
	dueDate: Date

	@Column({ length: 64, name: 'UserId' })
	userId: string

	@ManyToOne(() => User, (user) => user.id, { eager: true })
	@JoinColumn({ name: 'UserId' })
	user?: User

	@CreateDateColumn({ type: 'timestamptz', name: 'CreatedAt' })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamptz', nullable: true, name: 'UpdatedAt' })
	updatedAt: Date | null
}
