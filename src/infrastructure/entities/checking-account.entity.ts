import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm'
import { ICheckingAccount } from '../../models/entities/checking-account.entity'
import { User } from './user.entity'

@Entity('CheckingAccount')
export class CheckingAccount implements ICheckingAccount {
	@PrimaryColumn({ length: 64, name: 'Id' })
	id: string

	@Column({ length: 64, name: 'Name' })
	name: string

	@Column({ type: 'numeric', name: 'Balance' })
	balance: number

	@Column({ length: 6, default: '007a33', name: 'Color' })
	color: string

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
