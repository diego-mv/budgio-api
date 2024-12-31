import { Dto } from '../../../models'

export interface ICreateExpenseCreditCardUseCase {
	execute: (
		expenseCreditCard: Dto.ExpenseCreditCard.CreateExpenseCreditCardDto
	) => Promise<Dto.ExpenseCreditCard.ExpenseCreditCardDto>
}

export interface IDeleteExpenseCreditCardUseCase {
	execute: (expenseId: string) => Promise<void>
}

export interface IGetByCreditCardExpenseCreditCardUseCase {
	execute: (
		creditCardId: string
	) => Promise<Dto.ExpenseCreditCard.ExpenseCreditCardDto[]>
}

export interface IImportExpensesCreditCardUseCase {
	execute: (creditCardId: string, buffer: Buffer) => Promise<void>
}

export interface IUpdateExpenseCreditCardUseCase {
	execute: (
		expenseCreditCard: Dto.ExpenseCreditCard.UpdateExpenseCreditCardDto
	) => Promise<Dto.ExpenseCreditCard.ExpenseCreditCardDto>
}
