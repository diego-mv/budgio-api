import { Dto } from '../../../models'

export interface IGetHistoryByCheckingAccountUseCase {
	execute: (
		checkingAccountId: string
	) => Promise<Dto.HistoryCheckingAccount.HistoryCheckingAccountDto[]>
}

export interface IGetLastEntryUseCase {
	execute: (
		checkingAccountId: string
	) => Promise<Dto.HistoryCheckingAccount.BalanceDifferenceDto>
}

export interface IGetLastExpenseUseCase {
	execute: (
		checkingAccountId: string
	) => Promise<Dto.HistoryCheckingAccount.BalanceDifferenceDto>
}
