import { Inject, Injectable } from '@nestjs/common'
import { IExpenseCreditCardRepository } from '../../interfaces/repositories/expense-credit-card.repository'
import { CreditCardService } from '../../services/credit-card.service'
import { ICreditCardRepository } from '../../interfaces/repositories/credit-card.repository'
import { Mappers } from '../../mappers'
import { Dto } from '../../../models'
import { IExpenseCreditCardUseCase } from '../../../api/interfaces'

@Injectable()
export class CreateExpenseCreditCardUseCase
	implements IExpenseCreditCardUseCase.ICreateExpenseCreditCardUseCase
{
	private readonly creditCardValidation: CreditCardService

	constructor(
		@Inject('CreditCardRepository') creditCardRepository: ICreditCardRepository,
		@Inject('ExpenseCreditCardRepository')
		private readonly expenseCreditCardRepository: IExpenseCreditCardRepository
	) {
		this.creditCardValidation = new CreditCardService(creditCardRepository)
	}

	execute = async (
		expenseCreditCard: Dto.ExpenseCreditCard.CreateExpenseCreditCardDto
	): Promise<Dto.ExpenseCreditCard.ExpenseCreditCardDto> => {
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
