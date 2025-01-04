import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { IHistoryCheckingAccountRepository } from '../../domain/interfaces/repositories/history-checking-account.repository'
import { Entities } from '../../models'
import { GenericRepository } from './generic.postgres.repository'

@Injectable()
export class HistoryCheckingAccountPostgresRepository
	extends GenericRepository<Entities.IHistorytCheckingAccount>
	implements IHistoryCheckingAccountRepository
{
	constructor(repository: Repository<Entities.IHistorytCheckingAccount>) {
		super(repository)
	}
}
