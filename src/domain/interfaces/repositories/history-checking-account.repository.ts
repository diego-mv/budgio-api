import { Entities } from '../../../models'
import { IGenericRepository } from './generic.repository'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IHistoryCheckingAccountRepository
	extends IGenericRepository<Entities.IHistorytCheckingAccount> {}
