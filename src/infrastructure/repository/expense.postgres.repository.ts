import { Injectable } from '@nestjs/common'
import { IExpenseRepository } from '../../domain/interfaces/repositories/expense.repository'
import { GenericRepository } from './generic.postgres.repository'
import { Repository } from 'typeorm'
import { Entities } from '../../models'

@Injectable()
export class ExpensePostgresRepository
	extends GenericRepository<Entities.Expense>
	implements IExpenseRepository
{
	constructor(repository: Repository<Entities.Expense>) {
		super(repository)
	}
}
