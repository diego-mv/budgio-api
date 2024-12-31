import { Inject, Injectable } from '@nestjs/common'
import { ICheckingAccountRepository } from '../../interfaces/repositories/checking-account.repository'
import { Dto } from '../../../models'
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util'
import { Mappers } from '../../mappers'
import { ICheckingAccountUseCase } from '../../../api/interfaces'

@Injectable()
export class UpdateCheckingAccountUseCase
	implements ICheckingAccountUseCase.IUpdateCheckingAccountUseCase
{
	constructor(
		@Inject('CheckingAccountRepository')
		private readonly checkingAccountRepository: ICheckingAccountRepository
	) {}

	execute = async (
		checkingAccount: Dto.CheckingAccount.UpdateCheckingAccountDto
	) => {
		const currentCheckingAccount = await this.checkingAccountRepository.getById(
			checkingAccount.id
		)

		if (!currentCheckingAccount) {
			throw new HttpErrorByCode[404]('Checking account not found')
		}

		currentCheckingAccount.name = checkingAccount.name
		currentCheckingAccount.balance = checkingAccount.balance
		currentCheckingAccount.color = checkingAccount.color
		currentCheckingAccount.updatedAt = new Date()

		const updated = await this.checkingAccountRepository.update(
			currentCheckingAccount
		)

		return Mappers.CheckingAccount.entityToDto(updated)
	}
}
