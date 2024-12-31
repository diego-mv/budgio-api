import { Inject, Injectable } from '@nestjs/common'
import { isSameDay, parseISO } from 'date-fns'
import { IExpenseCreditCardUseCase } from '../../../api/interfaces'
import { ExcelHandler } from '../../../infrastructure/files-handlers/excel.handler'
import { Dto, Entities } from '../../../models'
import { ICreditCardRepository } from '../../interfaces/repositories/credit-card.repository'
import { IExpenseCreditCardRepository } from '../../interfaces/repositories/expense-credit-card.repository'
import { Mappers } from '../../mappers'
import { CreditCardService } from '../../services/credit-card.service'

@Injectable()
export class ImportExpensesCreditCardUseCase
	implements IExpenseCreditCardUseCase.IImportExpensesCreditCardUseCase
{
	private readonly creditCardValidation: CreditCardService

	constructor(
		@Inject('CreditCardRepository')
		private readonly creditCardRepository: ICreditCardRepository,
		@Inject('ExpenseCreditCardRepository')
		private readonly expenseCreditCardRepository: IExpenseCreditCardRepository
	) {
		this.creditCardValidation = new CreditCardService(this.creditCardRepository)
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
		const newExpenses: Entities.IExpenseCreditCard[] = []

		for (const expense of data) {
			const exist = this.existExpense(allExpenses, expense)

			if (exist) {
				continue
			}

			const newExpense: Entities.IExpenseCreditCard =
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
		allExpenses: Entities.IExpenseCreditCard[],
		expense: Dto.CreditCard.CreditCardImportDto
	): Entities.IExpenseCreditCard | undefined {
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
