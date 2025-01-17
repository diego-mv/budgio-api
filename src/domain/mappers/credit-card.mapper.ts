import { generateUid } from '../../infrastructure/id'
import { Dto, Entities } from '../../models'

export const CreditCard = {
	entityToDto: (entity: Entities.ICreditCard): Dto.CreditCard.CreditCardDto => {
		return {
			id: entity.id,
			creditLimit: entity.creditLimit,
			dueDate: entity.dueDate,
			name: entity.name,
			user: entity.user,
			color: entity.color,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		}
	},

	entitiesToDto: (
		entities: Entities.ICreditCard[]
	): Dto.CreditCard.CreditCardDto[] => {
		return entities.map((entity) => CreditCard.entityToDto(entity))
	},

	createToNewEntity: (
		userId: string,
		dto: Dto.CreditCard.CreateCreditCardDto
	): Entities.ICreditCard => {
		return {
			id: generateUid(),
			creditLimit: dto.creditLimit,
			dueDate: dto.dueDate,
			name: dto.name,
			color: dto.color,
			createdAt: new Date(),
			updatedAt: null,
			userId: userId
		}
	}
}
