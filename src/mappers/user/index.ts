import { generateUid } from '../../infrastructure/id'
import { Dto, Entities } from '../../models'

export const User = {
	entityToDto: (entity: Entities.User): Dto.User.UserDto => {
		return {
			id: entity.id,
			email: entity.email,
			name: entity.name
		}
	},

	createToNewEntity: (dto: Dto.User.CreateUserDto): Entities.User => {
		return {
			id: generateUid(),
			email: dto.email,
			name: dto.name,
			createdAt: new Date(),
			updatedAt: new Date(),
			passwordHash: null
		}
	}
}
