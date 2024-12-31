import { Inject, Injectable } from '@nestjs/common'
import { ICreditCardUseCase } from '../../../api/interfaces'
import { ICreditCardRepository } from '../../interfaces/repositories/credit-card.repository'

@Injectable()
export class DeleteCreditCardUseCase
	implements ICreditCardUseCase.IDeleteCreditCardUseCase
{
	constructor(
		@Inject('CreditCardRepository')
		private readonly creditCardRepository: ICreditCardRepository
	) {}

	execute = async (creditCardId: string) => {
		return await this.creditCardRepository.delete(creditCardId)
	}
}
