import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { IExpenseCreditCardRepository } from '../../domain/interfaces/repositories/expense-credit-card.repository'
import { GenericRepository } from './generic.postgres.repository'
import { Entities } from '../../models'

@Injectable()
export class ExpenseCreditCardPostgresRepository
	extends GenericRepository<Entities.ExpenseCreditCard>
	implements IExpenseCreditCardRepository
{
	constructor(repository: Repository<Entities.ExpenseCreditCard>) {
		super(repository)
	}
}
