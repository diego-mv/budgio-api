import { Entities } from '../../../models'
import { IGenericRepository } from './generic.repository'

export interface ICheckingAccountRepository
	extends IGenericRepository<Entities.CheckingAccount> {}
