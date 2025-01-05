import { Entities } from '../../../models'
import { IGenericRepository } from './generic.repository'

export interface IHistoryCheckingAccountRepository
	extends IGenericRepository<Entities.IHistorytCheckingAccount> {
	getLastEntry: (
		checkingAccountId: string
	) => Promise<{ date?: Date; value: number }>
	getLastExpense: (
		checkingAccountId: string
	) => Promise<{ date?: Date; value: number }>
}
