import { Inject, Injectable } from '@nestjs/common'
import { ICheckingAccountRepository } from '../../../domain/interfaces/repositories/checking-account.repository'

@Injectable()
export class DeleteCheckingAccountUseCase {
	constructor(
		@Inject('CheckingAccountRepository')
		private readonly checkingAccountRepository: ICheckingAccountRepository
	) {}

	execute = async (checkingAccountId: string) => {
		return await this.checkingAccountRepository.delete(checkingAccountId)
	}
}
