import { Inject, Injectable } from '@nestjs/common'
import { ICheckingAccountRepository } from '../../interfaces/repositories/checking-account.repository'
import { Dto } from '../../../models'
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util'
import { Mappers } from '../../mappers'
import { ICheckingAccountUseCase } from '../../../api/interfaces'

@Injectable()
export class UpdateCheckingAccountBalanceUseCase
	implements ICheckingAccountUseCase.IUpdateCheckingAccountBalanceUseCase
{
	constructor(
		@Inject('CheckingAccountRepository')
		private readonly checkingAccountRepository: ICheckingAccountRepository
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

		currentCheckingAccount.balance = checkingAccount.balance

		const updated = await this.checkingAccountRepository.update(
			currentCheckingAccount
		)

		return Mappers.CheckingAccount.entityToDto(updated)
	}
}
