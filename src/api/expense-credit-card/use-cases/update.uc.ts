import { Inject, Injectable } from '@nestjs/common'
import { IExpenseCreditCardRepository } from '../../../domain/interfaces/repositories/expense-credit-card.repository'
import { ExpenseCreditCardValidationService } from '../../../domain/services/expense-credit-card-validation.service'
import { Mappers } from '../../../mappers'
import { Dto } from '../../../models'

@Injectable()
export class UpdateExpenseCreditCardUseCase {
	private readonly expenseCreditCardValidation: ExpenseCreditCardValidationService
	constructor(
		@Inject('ExpenseCreditCardRepository')
		private readonly expenseCreditCardRepository: IExpenseCreditCardRepository
	) {
		this.expenseCreditCardValidation = new ExpenseCreditCardValidationService(
			expenseCreditCardRepository
		)
	}

	execute = async (
		expenseCreditCard: Dto.ExpenseCreditCard.UpdateExpenseCreditCardDto
	) => {
		const exist = await this.expenseCreditCardValidation.validateExist(
			expenseCreditCard.id
		)
		if (!exist) {
			throw new Error('Credit card not found')
		}
		const expenseCreditCardEntity = exist

		expenseCreditCardEntity.name = expenseCreditCard.name
		expenseCreditCardEntity.issueDate = expenseCreditCard.issueDate
		expenseCreditCardEntity.issueDate = expenseCreditCard.issueDate
		expenseCreditCardEntity.totalInstallments =
			expenseCreditCard.totalInstallments
		expenseCreditCardEntity.installmentAmount =
			expenseCreditCard.installmentAmount
		expenseCreditCardEntity.totalCost = expenseCreditCard.totalCost

		await this.expenseCreditCardRepository.update(expenseCreditCardEntity)

		return Mappers.ExpenseCreditCard.entityToDto(expenseCreditCardEntity)
	}
}
