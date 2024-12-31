import { Entities } from '../../models'
import { IExpenseCreditCardRepository } from '../interfaces/repositories/expense-credit-card.repository'

export class ExpenseCreditCardService {
	constructor(
		private readonly expenseCreditCardRepository: IExpenseCreditCardRepository
	) {}

	validateExist = async (
		expenseCreditCardId: string
	): Promise<Entities.IExpenseCreditCard> => {
		return this.expenseCreditCardRepository.getById(expenseCreditCardId)
	}
}
