import { Inject, Injectable } from '@nestjs/common'
import { IExpenseCreditCardUseCase } from '../../../api/interfaces'
import { Dto } from '../../../models'
import { IExpenseCreditCardRepository } from '../../interfaces/repositories/expense-credit-card.repository'
import { Mappers } from '../../mappers'

@Injectable()
export class GetByCreditCardExpenseCreditCardUseCase
	implements IExpenseCreditCardUseCase.IGetByCreditCardExpenseCreditCardUseCase
{
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
