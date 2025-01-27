export class IUser {
	id: string

	name: string

	email: string

	passwordHash?: string

	createdAt: Date

	updatedAt: Date | null
}
