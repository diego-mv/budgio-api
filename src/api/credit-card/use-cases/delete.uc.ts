import { Inject, Injectable } from '@nestjs/common'
import { ICreditCardRepository } from '../../../domain/interfaces/repositories/credit-card.repository'

@Injectable()
export class DeleteCreditCardUseCase {
	constructor(
		@Inject('CreditCardRepository')
		private readonly creditCardRepository: ICreditCardRepository
	) {}

	execute = async (creditCardId: string) => {
		return await this.creditCardRepository.delete(creditCardId)
	}
}
