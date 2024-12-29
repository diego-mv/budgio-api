import { Mappers } from '..'
import { generateUid } from '../../infrastructure/id'
import { Dto, Entities } from '../../models'

export const CheckingAccount = {
	entityToDto: (
		entity: Entities.CheckingAccount
	): Dto.CheckingAccount.CheckingAccountDto => {
		return {
			id: entity.id,
			balance: entity.balance,
			color: entity.color,
			name: entity.name,
			user: Mappers.User.entityToDto(entity.user),
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		}
	},

	dtoToEntity: (
		checkingAccountDto: Dto.CheckingAccount.CheckingAccountDto
	): Entities.CheckingAccount => {
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
		createCheckingAccountDto: Dto.CheckingAccount.CreateCheckingAccountDto
	): Entities.CheckingAccount => {
		return {
			id: generateUid(),
			balance: createCheckingAccountDto.balance,
			color: createCheckingAccountDto.color,
			name: createCheckingAccountDto.name,
			userId: createCheckingAccountDto.userId,
			createdAt: new Date(),
			updatedAt: null
		}
	},

	entitiesToDto: (
		checkingAccounts: Entities.CheckingAccount[]
	): Dto.CheckingAccount.CheckingAccountDto[] => {
		return checkingAccounts.map((checkingAccount) =>
			CheckingAccount.entityToDto(checkingAccount)
		)
	}
}
