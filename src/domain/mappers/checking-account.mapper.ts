import { generateUid } from '../../infrastructure/id'
import { Dto, Entities } from '../../models'
import { User } from './user.mapper'

export const CheckingAccount = {
	entityToDto: (
		entity: Entities.ICheckingAccount
	): Dto.CheckingAccount.CheckingAccountDto => {
		return {
			id: entity.id,
			balance: entity.balance,
			color: entity.color,
			name: entity.name,
			user: User.entityToDto(entity.user),
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		}
	},

	dtoToEntity: (
		checkingAccountDto: Dto.CheckingAccount.CheckingAccountDto
	): Entities.ICheckingAccount => {
		return {
			id: checkingAccountDto.id,
			balance: checkingAccountDto.balance,
			color: checkingAccountDto.color,
			name: checkingAccountDto.name,
			userId: checkingAccountDto.user.id,
			createdAt: checkingAccountDto.createdAt,
			updatedAt: checkingAccountDto.updatedAt
		}
	},

	createToNewEntity: (
		userId: string,
		createCheckingAccountDto: Dto.CheckingAccount.CreateCheckingAccountDto
	): Entities.ICheckingAccount => {
		return {
			id: generateUid(),
			balance: createCheckingAccountDto.balance,
			color: createCheckingAccountDto.color,
			name: createCheckingAccountDto.name,
			userId,
			createdAt: new Date(),
			updatedAt: null
		}
	},

	entitiesToDto: (
		checkingAccounts: Entities.ICheckingAccount[]
	): Dto.CheckingAccount.CheckingAccountDto[] => {
		return checkingAccounts.map((checkingAccount) =>
			CheckingAccount.entityToDto(checkingAccount)
		)
	}
}
