import { Entities } from '../../../models'
import { IGenericRepository } from './generic.repository'

export interface IExpenseCreditCardRepository
	extends IGenericRepository<Entities.ExpenseCreditCard> {}
