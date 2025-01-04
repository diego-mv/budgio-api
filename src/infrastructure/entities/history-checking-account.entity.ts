import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { CheckingAccount } from './checking-account.entity'
import { IHistorytCheckingAccount } from '../../models/entities'

@Entity('HistoryCheckingAccount')
export class HistoryCheckingAccount implements IHistorytCheckingAccount {
	@PrimaryColumn({ length: 64, name: 'Id' })
	id: string

	@Column({ type: 'numeric', name: 'Balance' })
	balance: number

	@Column({ type: 'timestamptz', name: 'Date' })
	date: Date

	@Column({ name: 'Description' })
	description?: string

	@Column({ length: 64, name: 'CheckingAccountId' })
	checkingAccountId: string

	@ManyToOne(() => CheckingAccount, (creditCard) => creditCard.id, {
		eager: true,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'CheckingAccountId' })
	creditCard?: CheckingAccount
}
