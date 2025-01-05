import { Inject, Injectable } from '@nestjs/common'
import { ICheckingAccountUseCase } from '../../../api/interfaces'
import { Dto } from '../../../models'
import { ICheckingAccountRepository } from '../../interfaces/repositories/checking-account.repository'
import { Mappers } from '../../mappers'
import { HistoryCheckingAccountService } from '../../services/history-checking-account.service'

@Injectable()
export class CreateCheckingAccountUseCase
	implements ICheckingAccountUseCase.ICreateCheckingAccountUseCase
{
	constructor(
		@Inject('CheckingAccountRepository')
		private readonly checkingAccountRepository: ICheckingAccountRepository,
		private readonly historyCheckingAccountService: HistoryCheckingAccountService
	) {}

	execute = async (
		userId: string,
		checkingAccount: Dto.CheckingAccount.CreateCheckingAccountDto
	) => {
		const checkingAccountEntity = Mappers.CheckingAccount.createToNewEntity(
			userId,
			checkingAccount
		)
		const created = await this.checkingAccountRepository.create(
			checkingAccountEntity
		)

		await this.historyCheckingAccountService.create(
			created.id,
			checkingAccount.balance,
			'Initial Balance'
		)

		return Mappers.CheckingAccount.entityToDto(created)
	}
}
