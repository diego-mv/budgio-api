import { Inject, Injectable } from '@nestjs/common'
import { IExpenseCreditCardRepository } from '../../interfaces/repositories/expense-credit-card.repository'
import { ExpenseCreditCardService } from '../../services/expense-credit-card.service'
import { Mappers } from '../../mappers'
import { Dto } from '../../../models'
import { IExpenseCreditCardUseCase } from '../../../api/interfaces'

@Injectable()
export class UpdateExpenseCreditCardUseCase
	implements IExpenseCreditCardUseCase.IUpdateExpenseCreditCardUseCase
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

	execute = async (
		expenseCreditCard: Dto.ExpenseCreditCard.UpdateExpenseCreditCardDto
	): Promise<Dto.ExpenseCreditCard.ExpenseCreditCardDto> => {
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
