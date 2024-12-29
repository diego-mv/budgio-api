import { Injectable } from '@nestjs/common'
import { ICheckingAccountRepository } from '../../domain/interfaces/repositories/checking-account.repository'
import { GenericRepository } from './generic.postgres.repository'
import { Repository } from 'typeorm'
import { Entities } from '../../models'

@Injectable()
export class CheckingAccountPostgresRepository
	extends GenericRepository<Entities.CheckingAccount>
	implements ICheckingAccountRepository
{
	constructor(repository: Repository<Entities.CheckingAccount>) {
		super(repository)
	}

	getByUserId = (userId: string): Promise<Entities.CheckingAccount[]> => {
		return this.repository.find({
			where: {
				userId
			},
			relations: ['user']
		})
	}
}
