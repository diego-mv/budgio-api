import { IUser } from './user.entity'

export class ICreditCard {
	id: string

	creditLimit: number

	name: string

	color: string

	dueDate: Date

	userId: string

	user?: IUser

	createdAt: Date

	updatedAt: Date | null
}
