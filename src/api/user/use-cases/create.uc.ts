import { Inject, Injectable } from '@nestjs/common'
import { IUserRepository } from '../../../domain/interfaces/repositories/user.repository'
import { Mappers } from '../../../mappers'
import { Dto } from '../../../models'

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository
	) {}

	execute = async (user: Dto.User.CreateUserDto): Promise<Dto.User.UserDto> => {
		const userEntity = Mappers.User.createToNewEntity(user)
		const created = await this.userRepository.create(userEntity)

		return Mappers.User.entityToDto(created)
	}
}
