import { Inject, Injectable } from '@nestjs/common'
import { ICheckingAccountRepository } from '../../../domain/interfaces/repositories/checking-account.repository'
import { Mappers } from '../../../mappers'

@Injectable()
export class GetCheckingAccountByUserUseCase {
	constructor(
		@Inject('CheckingAccountRepository')
		private readonly checkingAccountRepository: ICheckingAccountRepository
	) {}
	execute = async (userId: string) => {
		const checkingAccounts = await this.checkingAccountRepository.get({
			userId
		})

		return Mappers.CheckingAccount.entitiesToDto(checkingAccounts)
	}
}
