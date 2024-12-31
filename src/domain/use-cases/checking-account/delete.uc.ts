import { Inject, Injectable } from '@nestjs/common'
import { ICheckingAccountRepository } from '../../interfaces/repositories/checking-account.repository'
import { ICheckingAccountUseCase } from '../../../api/interfaces'

@Injectable()
export class DeleteCheckingAccountUseCase
	implements ICheckingAccountUseCase.IDeleteCheckingAccountUseCase
{
	constructor(
		@Inject('CheckingAccountRepository')
		private readonly checkingAccountRepository: ICheckingAccountRepository
	) {}

	execute = async (checkingAccountId: string) => {
		return await this.checkingAccountRepository.delete(checkingAccountId)
	}
}
