import { Entities } from '../../models'
import { IExpenseCreditCardRepository } from '../interfaces/repositories/expense-credit-card.repository'

export class ExpenseCreditCardValidationService {
	constructor(
		private readonly expenseCreditCardRepository: IExpenseCreditCardRepository
	) {}

	validateExist = async (
		expenseCreditCardId: string
	): Promise<Entities.ExpenseCreditCard> => {
		return this.expenseCreditCardRepository.getById(expenseCreditCardId)
	}
}
