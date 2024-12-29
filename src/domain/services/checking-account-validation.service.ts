import { Entities } from '../../models'
import { ICheckingAccountRepository } from '../interfaces/repositories/checking-account.repository'

export class CheckingAccountValidationService {
	constructor(
		private readonly checkingAccountRepository: ICheckingAccountRepository
	) {}

	validateExist = async (
		creditCardId: string
	): Promise<Entities.CheckingAccount> => {
		return this.checkingAccountRepository.getById(creditCardId)
	}
}
