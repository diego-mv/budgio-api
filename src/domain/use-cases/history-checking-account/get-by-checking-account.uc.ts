import { Inject, Injectable } from '@nestjs/common'
import { IHistoryCheckingAccountUseCase } from '../../../api/interfaces'
import { Dto } from '../../../models'
import { IHistoryCheckingAccountRepository } from '../../interfaces/repositories/history-checking-account.repository'
import { Mappers } from '../../mappers'

@Injectable()
export class GetHistoryByCheckingAccountUseCase
	implements IHistoryCheckingAccountUseCase.IGetHistoryByCheckingAccountUseCase
{
	constructor(
		@Inject('HistoryCheckingAccountRepository')
		private readonly historyCheckingAccountRepository: IHistoryCheckingAccountRepository
	) {}

	execute = async (
		checkingAccountId: string
	): Promise<Dto.HistoryCheckingAccount.HistoryCheckingAccountDto[]> => {
		const history = await this.historyCheckingAccountRepository.get({
			checkingAccountId
		})

		return Mappers.HistoryCheckingAccount.entitiesToDto(history)
	}
}
