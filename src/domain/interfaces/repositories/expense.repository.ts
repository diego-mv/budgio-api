import { Entities } from '../../../models'
import { IGenericRepository } from './generic.repository'

export interface IExpenseRepository
	extends IGenericRepository<Entities.IExpense> {
	getByUserPaginated(
		userId: string,
		page: number,
		pageSize: number
	): Promise<{ items: Entities.IExpense[]; total: number }>
}
