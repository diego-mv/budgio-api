import { Inject, Injectable } from '@nestjs/common'
import { IExpenseCreditCardRepository } from '../../../domain/interfaces/repositories/expense-credit-card.repository'
import { CreditCardValidationService } from '../../../domain/services/credit-card-validation.service'
import { ICreditCardRepository } from '../../../domain/interfaces/repositories/credit-card.repository'
import { Mappers } from '../../../mappers'
import { Dto } from '../../../models'

@Injectable()
export class CreateExpenseCreditCardUseCase {
	private readonly creditCardValidation: CreditCardValidationService

	constructor(
		@Inject('CreditCardRepository') creditCardRepository: ICreditCardRepository,
		@Inject('ExpenseCreditCardRepository')
		private readonly expenseCreditCardRepository: IExpenseCreditCardRepository
	) {
		this.creditCardValidation = new CreditCardValidationService(
			creditCardRepository
		)
	}

	execute = async (
		expenseCreditCard: Dto.ExpenseCreditCard.CreateExpenseCreditCardDto
	) => {
		const exist = await await this.creditCardValidation.validateExistCreditCard(
			expenseCreditCard.creditCardId
		)
		if (!exist) {
			throw new Error('Credit card not found')
		}

		const expenseCreditCardEntity =
			Mappers.ExpenseCreditCard.dtoToEntity(expenseCreditCard)
		const created = await this.expenseCreditCardRepository.create(
			expenseCreditCardEntity
		)

		return Mappers.ExpenseCreditCard.entityToDto(created)
	}
}
