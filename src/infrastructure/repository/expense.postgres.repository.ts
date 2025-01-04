import { Injectable } from '@nestjs/common'
import { IExpenseRepository } from '../../domain/interfaces/repositories/expense.repository'
import { GenericRepository } from './generic.postgres.repository'
import { Repository } from 'typeorm'
import { Entities } from '../../models'

@Injectable()
export class ExpensePostgresRepository
	extends GenericRepository<Entities.IExpense>
	implements IExpenseRepository
{
	constructor(repository: Repository<Entities.IExpense>) {
		super(repository)
	}

	getByUserPaginated = async (
		userId: string,
		page: number,
		pageSize: number
	): Promise<{ items: Entities.IExpense[]; total: number }> => {
		const [items, total] = await this.repository.findAndCount({
			where: { userId },
			skip: (page - 1) * pageSize,
			take: pageSize
		})

		return {
			items,
			total
		}
	}
}
