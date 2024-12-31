import { Inject, Injectable } from '@nestjs/common'
import { ICreditCardRepository } from '../../interfaces/repositories/credit-card.repository'
import { Mappers } from '../../mappers'
import { Dto } from '../../../models'
import { ICreditCardUseCase } from '../../../api/interfaces'

@Injectable()
export class GetCreditCardByUserUseCase
	implements ICreditCardUseCase.IGetCreditCardByUserUseCase
{
	constructor(
		@Inject('CreditCardRepository')
		private readonly creditCardRepository: ICreditCardRepository
	) {}

	execute = async (userId: string): Promise<Dto.CreditCard.CreditCardDto[]> => {
		const creditCards = await this.creditCardRepository.getByUser(userId)

		return Mappers.CreditCard.entitiesToDto(creditCards)
	}
}
