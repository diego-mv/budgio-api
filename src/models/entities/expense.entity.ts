import { IUser } from './user.entity'

export class IExpense {
	id: string

	installmentAmount: number

	name: string

	dueDate: Date

	userId: string

	user?: IUser

	createdAt: Date

	updatedAt: Date | null

	paid: boolean
	installments: number
	amount: number
}
