import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { IExpenseCreditCardRepository } from '../../domain/interfaces/repositories/expense-credit-card.repository'
import { GenericRepository } from './generic.postgres.repository'
import { Entities } from '../../models'

@Injectable()
export class ExpenseCreditCardPostgresRepository
	extends GenericRepository<Entities.IExpenseCreditCard>
	implements IExpenseCreditCardRepository
{
	constructor(repository: Repository<Entities.IExpenseCreditCard>) {
		super(repository)
	}
}
