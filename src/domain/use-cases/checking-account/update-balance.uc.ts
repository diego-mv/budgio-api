import { Inject, Injectable } from '@nestjs/common'
import { ICheckingAccountRepository } from '../../interfaces/repositories/checking-account.repository'
import { Dto } from '../../../models'
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util'
import { Mappers } from '../../mappers'
import { ICheckingAccountUseCase } from '../../../api/interfaces'
import { HistoryCheckingAccountService } from '../../services/history-checking-account.service'

@Injectable()
export class UpdateCheckingAccountBalanceUseCase
	implements ICheckingAccountUseCase.IUpdateCheckingAccountBalanceUseCase
{
	constructor(
		@Inject('CheckingAccountRepository')
		private readonly checkingAccountRepository: ICheckingAccountRepository,
		private readonly historyCheckingAccountService: HistoryCheckingAccountService
	) {}

	execute = async (
		checkingAccountId: string,
		checkingAccount: Dto.CheckingAccount.UpdateCheckingAccountBalanceDto
	) => {
		const currentCheckingAccount =
			await this.checkingAccountRepository.getById(checkingAccountId)

		if (!currentCheckingAccount) {
			throw new HttpErrorByCode[404]('Checking account not found')
		}

		let newBalance = Number(currentCheckingAccount.balance)

		switch (checkingAccount.type) {
			case 'balance':
			default:
				newBalance = Number(checkingAccount.amount)
				break
			case 'expense':
				newBalance -= Number(checkingAccount.amount)
				break
			case 'income':
				newBalance += Number(checkingAccount.amount)
				break
		}
		currentCheckingAccount.balance = newBalance

		const updated = await this.checkingAccountRepository.update(
			currentCheckingAccount
		)

		await this.historyCheckingAccountService.create(
			checkingAccountId,
			newBalance,
			checkingAccount.description
		)

		return Mappers.CheckingAccount.entityToDto(updated)
	}
}
