import { Inject, Injectable } from '@nestjs/common'
import { ICreditCardRepository } from '../../interfaces/repositories/credit-card.repository'
import { Mappers } from '../../mappers'
import { Dto } from '../../../models'
import { ICreditCardUseCase } from '../../../api/interfaces'

@Injectable()
export class CreateCreditCardUseCase
	implements ICreditCardUseCase.ICreateCreditCardUseCase
{
	constructor(
		@Inject('CreditCardRepository')
		private readonly creditCardRepository: ICreditCardRepository
	) {}

	execute = async (
		creditCard: Dto.CreditCard.CreateCreditCardDto
	): Promise<Dto.CreditCard.CreditCardDto> => {
		const creditCardEntity = Mappers.CreditCard.createToNewEntity(creditCard)
		const created = await this.creditCardRepository.create(creditCardEntity)

		return Mappers.CreditCard.entityToDto(created)
	}
}
