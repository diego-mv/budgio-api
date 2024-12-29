import { parseISO } from 'date-fns'
import { Mappers } from '..'
import { Dto, Entities } from '../../models'
import { generateUid } from '../../infrastructure/id'

export const ExpenseCreditCard = {
	importedToEntity: (
		creditCardId: string,
		expenseImported: Dto.CreditCard.CreditCardImportDto
	) => {
		return {
			id: generateUid(),
			creditCardId: creditCardId,
			installmentAmount: expenseImported.installmentAmount,
			issueDate: parseISO(expenseImported.date),
			name: expenseImported.description,
			totalCost: expenseImported.amount,
			totalInstallments: Number(
				Number(
					expenseImported.amount / expenseImported.installmentAmount
				).toFixed(0)
			),
			createdAt: new Date(),
			updatedAt: null
		}
	},

	dtoToEntity: (
		expenseCreditCard: Dto.ExpenseCreditCard.CreateExpenseCreditCardDto
	): Entities.ExpenseCreditCard => {
		return {
			id: generateUid(),
			creditCardId: expenseCreditCard.creditCardId,
			installmentAmount: expenseCreditCard.installmentAmount,
			issueDate: parseISO(expenseCreditCard.issueDate.toISOString()),
			name: expenseCreditCard.name,
			totalCost: expenseCreditCard.totalCost,
			totalInstallments: expenseCreditCard.totalInstallments,
			createdAt: new Date(),
			updatedAt: null
		}
	},

	entityToDto: (
		expenseCreditCard: Entities.ExpenseCreditCard
	): Dto.ExpenseCreditCard.ExpenseCreditCardDto => {
		return {
			id: expenseCreditCard.id,
			installmentAmount: expenseCreditCard.installmentAmount,
			issueDate: expenseCreditCard.issueDate,
			name: expenseCreditCard.name,
			totalCost: expenseCreditCard.totalCost,
			totalInstallments: expenseCreditCard.totalInstallments,
			creditCard: Mappers.CreditCard.entityToDto(expenseCreditCard.creditCard),
			createdAt: expenseCreditCard.createdAt,
			updatedAt: expenseCreditCard.updatedAt
		}
	},

	entitiesToDto(
		expenseCreditCards: Entities.ExpenseCreditCard[]
	): Dto.ExpenseCreditCard.ExpenseCreditCardDto[] {
		return expenseCreditCards.map((expenseCreditCard) =>
			this.entityToDto(expenseCreditCard)
		)
	}
}
