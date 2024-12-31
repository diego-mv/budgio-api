import { Inject, Injectable } from '@nestjs/common'
import { Dto } from '../../models'
import { IExpenseCreditCardUseCase } from '../interfaces'

@Injectable()
export class ExpenseCreditCardService {
	constructor(
		@Inject('GetByCreditCardExpenseCreditCardUseCase')
		private readonly getByCreditCardExpenseCreditCardUseCase: IExpenseCreditCardUseCase.IGetByCreditCardExpenseCreditCardUseCase,
		@Inject('ImportExpensesCreditCardUseCase')
		private readonly importExpensesCreditCardUseCase: IExpenseCreditCardUseCase.IImportExpensesCreditCardUseCase,
		@Inject('CreateExpenseCreditCardUseCase')
		private readonly createExpenseCreditCardUseCase: IExpenseCreditCardUseCase.ICreateExpenseCreditCardUseCase,
		@Inject('UpdateExpenseCreditCardUseCase')
		private readonly updateExpenseCreditCardUseCase: IExpenseCreditCardUseCase.IUpdateExpenseCreditCardUseCase,
		@Inject('DeleteExpenseCreditCardUseCase')
		private readonly deleteExpenseCreditCardUseCase: IExpenseCreditCardUseCase.IDeleteExpenseCreditCardUseCase
	) {}

	getByCreditCardExpenseCreditCard = async (creditCardId: string) => {
		return await this.getByCreditCardExpenseCreditCardUseCase.execute(
			creditCardId
		)
	}

	importExpensesCreditCard = async (creditCardId: string, file: Buffer) => {
		return await this.importExpensesCreditCardUseCase.execute(
			creditCardId,
			file
		)
	}

	createExpenseCreditCard = async (
		expenseCreditCard: Dto.ExpenseCreditCard.CreateExpenseCreditCardDto
	) => {
		return await this.createExpenseCreditCardUseCase.execute(expenseCreditCard)
	}

	updateExpenseCreditCard = async (
		expenseCreditCard: Dto.ExpenseCreditCard.UpdateExpenseCreditCardDto
	) => {
		return await this.updateExpenseCreditCardUseCase.execute(expenseCreditCard)
	}

	deleteExpenseCreditCard = async (id: string) => {
		return await this.deleteExpenseCreditCardUseCase.execute(id)
	}
}
