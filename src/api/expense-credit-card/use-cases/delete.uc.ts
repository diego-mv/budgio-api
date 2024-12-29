import { Inject, Injectable } from '@nestjs/common'
import { IExpenseCreditCardRepository } from '../../../domain/interfaces/repositories/expense-credit-card.repository'
import { ExpenseCreditCardValidationService } from '../../../domain/services/expense-credit-card-validation.service'

@Injectable()
export class DeleteExpenseCreditCardUseCase {
	private readonly expenseCreditCardValidation: ExpenseCreditCardValidationService
	constructor(
		@Inject('ExpenseCreditCardRepository')
		private readonly expenseCreditCardRepository: IExpenseCreditCardRepository
	) {
		this.expenseCreditCardValidation = new ExpenseCreditCardValidationService(
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
