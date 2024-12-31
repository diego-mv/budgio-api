import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { ICreditCardRepository } from '../../domain/interfaces/repositories/credit-card.repository'
import { GenericRepository } from './generic.postgres.repository'
import { Entities } from '../../models'

@Injectable()
export class CreditCardPostgresRepository
	extends GenericRepository<Entities.ICreditCard>
	implements ICreditCardRepository
{
	constructor(repository: Repository<Entities.ICreditCard>) {
		super(repository)
	}

	getByUser = async (userId: string): Promise<Entities.ICreditCard[]> => {
		try {
			return await this.repository.find({ where: { userId: userId } })
		} catch (error) {
			this.logger.error('Error on get credit cards by user id', error)
			throw new Error(error)
		}
	}
}
