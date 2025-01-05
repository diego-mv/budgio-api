import { Inject, Injectable } from '@nestjs/common'
import { IHistoryCheckingAccountUseCase } from '../../../api/interfaces'
import { Dto } from '../../../models'
import { IHistoryCheckingAccountRepository } from '../../interfaces/repositories/history-checking-account.repository'

@Injectable()
export class GetLastEntryCheckingAccountUseCase
	implements IHistoryCheckingAccountUseCase.IGetLastEntryUseCase
{
	constructor(
		@Inject('HistoryCheckingAccountRepository')
		private readonly historyCheckingAccountRepository: IHistoryCheckingAccountRepository
	) {}

	execute = async (
		checkingAccountId: string
	): Promise<Dto.HistoryCheckingAccount.BalanceDifferenceDto | null> => {
		const lastEntry =
			await this.historyCheckingAccountRepository.getLastEntry(
				checkingAccountId
			)
		return {
			date: lastEntry.date,
			difference: lastEntry.value
		}
	}
}
