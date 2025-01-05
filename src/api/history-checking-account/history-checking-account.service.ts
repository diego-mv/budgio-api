import { Inject, Injectable } from '@nestjs/common'
import { IHistoryCheckingAccountUseCase } from '../interfaces'

@Injectable()
export class HistoryCheckingAccountService {
	constructor(
		@Inject('GetHistoryByCheckingAccountUseCase')
		private readonly getHistoryByCheckingAccountUseCase: IHistoryCheckingAccountUseCase.IGetHistoryByCheckingAccountUseCase,
		@Inject('GetLastEntryCheckingAccountUseCase')
		private readonly getLastEntryUseCase: IHistoryCheckingAccountUseCase.IGetLastEntryUseCase,
		@Inject('GetLastExpenseCheckingAcccountUseCase')
		private readonly getLastExpenseUseCase: IHistoryCheckingAccountUseCase.IGetLastExpenseUseCase
	) {}

	getByCheckingAccount = async (checkingAccountId: string) => {
		return await this.getHistoryByCheckingAccountUseCase.execute(
			checkingAccountId
		)
	}

	getLastExpense = async (checkingAccountId: string) => {
		const expense = await this.getLastExpenseUseCase.execute(checkingAccountId)
		return expense
	}

	getLastEntry = async (checkingAccountId: string) => {
		return await this.getLastEntryUseCase.execute(checkingAccountId)
	}
}
