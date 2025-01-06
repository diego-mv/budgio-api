import { Inject, Injectable } from '@nestjs/common'
import { IHistoryCheckingAccountUseCase } from '../../../api/interfaces'
import { Dto } from '../../../models'
import { IHistoryCheckingAccountRepository } from '../../interfaces/repositories/history-checking-account.repository'

@Injectable()
export class GetLastIncomeCheckingAccountUseCase
	implements IHistoryCheckingAccountUseCase.IGetIncomeUseCase
{
	constructor(
		@Inject('HistoryCheckingAccountRepository')
		private readonly historyCheckingAccountRepository: IHistoryCheckingAccountRepository
	) {}

	execute = async (
		checkingAccountId: string
	): Promise<Dto.HistoryCheckingAccount.BalanceDifferenceDto | null> => {
		const lastIncome =
			await this.historyCheckingAccountRepository.getLastIncome(
				checkingAccountId
			)
		return {
			date: lastIncome.date,
			difference: lastIncome.value
		}
	}
}
