import { Inject, Injectable } from '@nestjs/common'
import { IExpenseCreditCardRepository } from '../../interfaces/repositories/expense-credit-card.repository'
import { ExpenseCreditCardService } from '../../services/expense-credit-card.service'
import { IExpenseCreditCardUseCase } from '../../../api/interfaces'

@Injectable()
export class DeleteExpenseCreditCardUseCase
	implements IExpenseCreditCardUseCase.IDeleteExpenseCreditCardUseCase
{
	private readonly expenseCreditCardValidation: ExpenseCreditCardService
	constructor(
		@Inject('ExpenseCreditCardRepository')
		private readonly expenseCreditCardRepository: IExpenseCreditCardRepository
	) {
		this.expenseCreditCardValidation = new ExpenseCreditCardService(
			expenseCreditCardRepository
		)
	}

	execute = async (expenseCreditCardId: string) => {
		const exist =
			await this.expenseCreditCardValidation.validateExist(expenseCreditCardId)
		if (!exist) {
			throw new Error('Credit card not found')
		}

		await this.expenseCreditCardRepository.delete(expenseCreditCardId)
	}
}
