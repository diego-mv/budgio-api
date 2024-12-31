import { Entities } from '../../models'
import { ICheckingAccountRepository } from '../interfaces/repositories/checking-account.repository'

export class CheckingAccountService {
	constructor(
		private readonly checkingAccountRepository: ICheckingAccountRepository
	) {}

	validateExist = async (
		creditCardId: string
	): Promise<Entities.ICheckingAccount> => {
		return this.checkingAccountRepository.getById(creditCardId)
	}
}
