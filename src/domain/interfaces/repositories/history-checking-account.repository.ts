import { Entities } from '../../../models'
import { IGenericRepository } from './generic.repository'

export interface IHistoryCheckingAccountRepository
	extends IGenericRepository<Entities.IHistorytCheckingAccount> {
	getLastIncome: (
		checkingAccountId: string
	) => Promise<{ date?: Date; value: number }>
	getLastExpense: (
		checkingAccountId: string
	) => Promise<{ date?: Date; value: number }>
}
