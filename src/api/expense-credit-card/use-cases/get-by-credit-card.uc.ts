import { Inject, Injectable } from '@nestjs/common'
import { IExpenseCreditCardRepository } from '../../../domain/interfaces/repositories/expense-credit-card.repository'
import { Mappers } from '../../../mappers'
import { Dto } from '../../../models'

@Injectable()
export class GetByCreditCardExpenseCreditCardUseCase {
	constructor(
		@Inject('ExpenseCreditCardRepository')
		private readonly expenseCreditCardRepository: IExpenseCreditCardRepository
	) {}

	execute = async (
		creditCardId: string
	): Promise<Dto.ExpenseCreditCard.ExpenseCreditCardDto[]> => {
		const expenses = await this.expenseCreditCardRepository.get({
			creditCardId
		})
		return Mappers.ExpenseCreditCard.entitiesToDto(expenses)
	}
}
