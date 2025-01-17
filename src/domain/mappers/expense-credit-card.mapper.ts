import { parseISO } from 'date-fns'
import { generateUid } from '../../infrastructure/id'
import { Dto, Entities } from '../../models'
import { CreditCard } from './credit-card.mapper'

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
			name: expenseImported.description.replaceAll('*', ''),
			totalCost: expenseImported.amount,
			totalInstallments: Number(
				Number(
					Number(expenseImported.amount) /
						Number(expenseImported.installmentAmount)
				).toFixed(0)
			),
			createdAt: new Date(),
			updatedAt: null
		}
	},

	dtoToEntity: (
		expenseCreditCard: Dto.ExpenseCreditCard.CreateExpenseCreditCardDto
	): Entities.IExpenseCreditCard => {
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
		expenseCreditCard: Entities.IExpenseCreditCard
	): Dto.ExpenseCreditCard.ExpenseCreditCardDto => {
		return {
			id: expenseCreditCard.id,
			installmentAmount: expenseCreditCard.installmentAmount,
			issueDate: expenseCreditCard.issueDate,
			name: expenseCreditCard.name,
			totalCost: expenseCreditCard.totalCost,
			totalInstallments: expenseCreditCard.totalInstallments,
			creditCard: CreditCard.entityToDto(expenseCreditCard.creditCard),
			createdAt: expenseCreditCard.createdAt,
			updatedAt: expenseCreditCard.updatedAt
		}
	},

	entitiesToDto(
		expenseCreditCards: Entities.IExpenseCreditCard[]
	): Dto.ExpenseCreditCard.ExpenseCreditCardDto[] {
		return expenseCreditCards.map((expenseCreditCard) =>
			this.entityToDto(expenseCreditCard)
		)
	}
}
