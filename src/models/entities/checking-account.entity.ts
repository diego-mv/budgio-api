import { IUser } from './user.entity'

export class ICheckingAccount {
	id: string

	name: string

	balance: number

	color: string

	userId: string

	user?: IUser

	createdAt: Date

	updatedAt: Date | null
}
