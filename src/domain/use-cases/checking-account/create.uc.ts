import { Inject, Injectable } from '@nestjs/common'
import { ICheckingAccountRepository } from '../../interfaces/repositories/checking-account.repository'
import { Dto } from '../../../models'
import { Mappers } from '../../mappers'
import { ICheckingAccountUseCase } from '../../../api/interfaces'

@Injectable()
export class CreateCheckingAccountUseCase
	implements ICheckingAccountUseCase.ICreateCheckingAccountUseCase
{
	constructor(
		@Inject('CheckingAccountRepository')
		private readonly checkingAccountRepository: ICheckingAccountRepository
	) {}

	execute = async (
		checkingAccount: Dto.CheckingAccount.CreateCheckingAccountDto
	) => {
		const checkingAccountEntity =
			Mappers.CheckingAccount.createToNewEntity(checkingAccount)
		const created = await this.checkingAccountRepository.create(
			checkingAccountEntity
		)

		return Mappers.CheckingAccount.entityToDto(created)
	}
}
