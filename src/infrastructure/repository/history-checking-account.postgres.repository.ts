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

	getLastIncome = async (
		checkingAccountId: string
	): Promise<{ date?: Date; value: number }> => {
		const result = await this.repository.find({
			where: { checkingAccountId },
			order: { date: 'DESC' }
		})

		if (result.length === 0) {
			return {
				value: 0
			}
		}

		for (let i = 0; i < result.length - 1; i++) {
			if (Number(result[i].balance) > Number(result[i + 1].balance)) {
				return {
					date: result[i].date,
					value: Number(result[i].balance) - Number(result[i + 1].balance)
				}
			}
		}

		return {
			value: 0
		}
	}

	getLastExpense = async (
		checkingAccountId: string
	): Promise<{ date?: Date; value: number }> => {
		const result = await this.repository.find({
			where: { checkingAccountId },
			order: { date: 'DESC' }
		})

		if (result.length === 0) {
			return {
				value: 0
			}
		}

		for (let i = 0; i < result.length - 1; i++) {
			if (Number(result[i].balance) < Number(result[i + 1].balance)) {
				return {
					date: result[i].date,
					value: Number(result[i].balance) - Number(result[i + 1].balance)
				}
			}
		}

		return {
			value: 0
		}
	}
}
