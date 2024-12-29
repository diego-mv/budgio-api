import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm'
import { CreditCard } from './credit-card.entity'

@Entity('ExpenseCreditCard')
export class ExpenseCreditCard {
	@PrimaryColumn({ length: 64, name: 'Id' })
	id: string

	@Column({ length: 64, name: 'CreditCardId' })
	creditCardId: string

	@ManyToOne(() => CreditCard, (creditCard) => creditCard.id, {
		eager: true,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'CreditCardId' })
	creditCard?: CreditCard

	@Column({ length: 64, name: 'Name' })
	name: string

	@Column({ type: 'timestamptz', name: 'IssueDate' })
	issueDate: Date

	@Column({ type: 'integer', name: 'TotalInstallments' })
	totalInstallments: number

	@Column({ type: 'numeric', name: 'InstallmentAmount' })
	installmentAmount: number

	@Column({ type: 'numeric', name: 'TotalCost' })
	totalCost: number

	@CreateDateColumn({ type: 'timestamptz', name: 'CreatedAt' })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamptz', nullable: true, name: 'UpdatedAt' })
	updatedAt: Date | null
}
