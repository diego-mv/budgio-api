import { Inject, Injectable } from '@nestjs/common'
import { isSameDay, parseISO } from 'date-fns'
import { ICreditCardRepository } from '../../../domain/interfaces/repositories/credit-card.repository'
import { IExpenseCreditCardRepository } from '../../../domain/interfaces/repositories/expense-credit-card.repository'
import { CreditCardValidationService } from '../../../domain/services/credit-card-validation.service'
import { ExcelHandler } from '../../../infrastructure/files-handlers/excel.handler'
import { Mappers } from '../../../mappers'
import { Dto, Entities } from '../../../models'

@Injectable()
export class ImportExpensesCreditCardUseCase {
	private readonly creditCardValidation: CreditCardValidationService

	constructor(
		@Inject('CreditCardRepository')
		private readonly creditCardRepository: ICreditCardRepository,
		@Inject('ExpenseCreditCardRepository')
		private readonly expenseCreditCardRepository: IExpenseCreditCardRepository
	) {
		this.creditCardValidation = new CreditCardValidationService(
			this.creditCardRepository
		)
	}

	async execute(creditCardId: string, buffer: Buffer) {
		const exist =
			await this.creditCardValidation.validateExistCreditCard(creditCardId)
		if (!exist) {
			throw new Error('Credit card not found')
		}

		const data =
			await ExcelHandler.readExcel<Dto.CreditCard.CreditCardImportDto>(
				buffer,
				this.headersDtoMap
			)

		const allExpenses = await this.expenseCreditCardRepository.get({
			creditCardId
		})
		const newExpenses: Entities.ExpenseCreditCard[] = []

		for (const expense of data) {
			const exist = this.existExpense(allExpenses, expense)

			if (exist) {
				continue
			}

			const newExpense: Entities.ExpenseCreditCard =
				Mappers.ExpenseCreditCard.importedToEntity(creditCardId, expense)

			newExpenses.push(newExpense)
		}

		await this.expenseCreditCardRepository.createMany(newExpenses)
	}

	private headersDtoMap: {
		[key in keyof Dto.CreditCard.CreditCardImportDto]: string
	} = {
		date: 'FECHA',
		description: 'DESCRIPCION',
		holder: 'TITULAR/ADICIONAL',
		amount: 'MONTO',
		pendingInstallments: 'CUOTAS PENDIENTES',
		installmentAmount: 'VALOR CUOTA'
	}

	private existExpense(
		allExpenses: Entities.ExpenseCreditCard[],
		expense: Dto.CreditCard.CreditCardImportDto
	): Entities.ExpenseCreditCard | undefined {
		return allExpenses.find(
			(e) =>
				e.name === expense.description &&
				isSameDay(e.issueDate, parseISO(expense.date)) &&
				e.totalCost === expense.amount &&
				e.installmentAmount === expense.installmentAmount &&
				e.totalInstallments ===
					Number(Number(expense.amount / expense.installmentAmount).toFixed(0))
		)
	}
}
