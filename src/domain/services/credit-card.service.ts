import { Entities } from '../../models'
import { ICreditCardRepository } from '../interfaces/repositories/credit-card.repository'

export class CreditCardService {
	constructor(private readonly creditCardRepository: ICreditCardRepository) {}

	validateExistCreditCard = async (
		creditCardId: string
	): Promise<Entities.ICreditCard> => {
		return this.creditCardRepository.getById(creditCardId)
	}
}
