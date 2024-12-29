import { Inject, Injectable } from '@nestjs/common'
import { ICreditCardRepository } from '../../../domain/interfaces/repositories/credit-card.repository'
import { Mappers } from '../../../mappers'
import { Dto } from '../../../models'

@Injectable()
export class GetCreditCardByUserUseCase {
	constructor(
		@Inject('CreditCardRepository')
		private readonly creditCardRepository: ICreditCardRepository
	) {}

	execute = async (userId: string): Promise<Dto.CreditCard.CreditCardDto[]> => {
		const creditCards = await this.creditCardRepository.getByUser(userId)

		return Mappers.CreditCard.entitiesToDto(creditCards)
	}
}
