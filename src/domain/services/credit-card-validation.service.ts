import { Entities } from '../../models'
import { ICreditCardRepository } from '../interfaces/repositories/credit-card.repository'

export class CreditCardValidationService {
	constructor(private readonly creditCardRepository: ICreditCardRepository) {}

	validateExistCreditCard = async (
		creditCardId: string
	): Promise<Entities.CreditCard> => {
		return this.creditCardRepository.getById(creditCardId)
	}
}
