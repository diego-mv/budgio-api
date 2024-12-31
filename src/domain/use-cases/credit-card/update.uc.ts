import { Inject, Injectable } from '@nestjs/common'
import { ICreditCardRepository } from '../../interfaces/repositories/credit-card.repository'
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util'
import { Mappers } from '../../mappers'
import { Dto } from '../../../models'
import { ICreditCardUseCase } from '../../../api/interfaces'

@Injectable()
export class UpdateCreditCardUseCase
	implements ICreditCardUseCase.IUpdateCreditCardUseCase
{
	constructor(
		@Inject('CreditCardRepository')
		private readonly creditCardRepository: ICreditCardRepository
	) {}

	execute = async (
		creditCard: Dto.CreditCard.UpdateCreditCardDto
	): Promise<Dto.CreditCard.CreditCardDto> => {
		const currentCreditCard = await this.creditCardRepository.getById(
			creditCard.id
		)

		if (!currentCreditCard) {
			throw new HttpErrorByCode[404]('Credit card not found')
		}

		currentCreditCard.color = creditCard.color
		currentCreditCard.creditLimit = creditCard.creditLimit
		currentCreditCard.dueDate = creditCard.dueDate
		currentCreditCard.name = creditCard.name
		currentCreditCard.updatedAt = new Date()

		const updated = await this.creditCardRepository.update(currentCreditCard)

		return Mappers.CreditCard.entityToDto(updated)
	}
}
