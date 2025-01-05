import { Inject, Injectable } from '@nestjs/common'
import { IHistoryCheckingAccountUseCase } from '../../../api/interfaces'
import { Dto } from '../../../models'
import { IHistoryCheckingAccountRepository } from '../../interfaces/repositories/history-checking-account.repository'

@Injectable()
export class GetLastExpenseCheckingAccountUseCase
	implements IHistoryCheckingAccountUseCase.IGetLastExpenseUseCase
{
	constructor(
		@Inject('HistoryCheckingAccountRepository')
		private readonly historyCheckingAccountRepository: IHistoryCheckingAccountRepository
	) {}

	execute = async (
		checkingAccountId: string
	): Promise<Dto.HistoryCheckingAccount.BalanceDifferenceDto | null> => {
		const lastExpense =
			await this.historyCheckingAccountRepository.getLastExpense(
				checkingAccountId
			)

		const diffDto: Dto.HistoryCheckingAccount.BalanceDifferenceDto = {
			difference: lastExpense.value,
			date: lastExpense.date
		}
		return diffDto
	}
}
