import { ICreditCard } from './credit-card.entity'

export class IExpenseCreditCard {
	id: string

	creditCardId: string

	creditCard?: ICreditCard

	name: string

	issueDate: Date

	totalInstallments: number

	installmentAmount: number

	totalCost: number

	createdAt: Date

	updatedAt: Date | null
}
