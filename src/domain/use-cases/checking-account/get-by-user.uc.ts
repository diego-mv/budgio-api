import { Inject, Injectable } from '@nestjs/common'
import { ICheckingAccountRepository } from '../../interfaces/repositories/checking-account.repository'
import { Mappers } from '../../mappers'
import { ICheckingAccountUseCase } from '../../../api/interfaces'
import { Dto } from '../../../models'

@Injectable()
export class GetCheckingAccountByUserUseCase
	implements ICheckingAccountUseCase.IGetCheckingAccountByUserUseCase
{
	constructor(
		@Inject('CheckingAccountRepository')
		private readonly checkingAccountRepository: ICheckingAccountRepository
	) {}
	execute = async (
		userId: string
	): Promise<Dto.CheckingAccount.CheckingAccountDto[]> => {
		const checkingAccounts = await this.checkingAccountRepository.get({
			userId
		})

		return Mappers.CheckingAccount.entitiesToDto(checkingAccounts)
	}
}
