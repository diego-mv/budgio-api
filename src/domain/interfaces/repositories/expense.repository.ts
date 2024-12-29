import { Entities } from '../../../models'
import { IGenericRepository } from './generic.repository'

export interface IExpenseRepository
	extends IGenericRepository<Entities.Expense> {}
