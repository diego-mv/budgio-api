import { generateUid } from '../../infrastructure/id'
import { Entities } from '../../models'
import { IHistoryCheckingAccountRepository } from '../interfaces/repositories/history-checking-account.repository'

export class HistoryCheckingAccountService {
	constructor(
		private readonly historyCheckingAccountRepository: IHistoryCheckingAccountRepository
	) {}

	create = async (
		checkingAccountId: string,
		balance: number,
		description?: string
	): Promise<Entities.IHistorytCheckingAccount> => {
		const created = await this.historyCheckingAccountRepository.create({
			id: generateUid(),
			balance,
			date: new Date(),
			description,
			checkingAccountId
		})

		return created
	}
}
