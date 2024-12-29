import { Inject, Injectable } from '@nestjs/common'
import { ICheckingAccountRepository } from '../../../domain/interfaces/repositories/checking-account.repository'
import { Dto } from '../../../models'
import { Mappers } from '../../../mappers'

@Injectable()
export class CreateCheckingAccountUseCase {
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
