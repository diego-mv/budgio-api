import { Inject, Injectable } from '@nestjs/common'
import { IUserRepository } from '../../interfaces/repositories/user.repository'
import { Mappers } from '../../mappers'
import { Dto } from '../../../models'
import { IUserUseCase } from '../../../api/interfaces'

@Injectable()
export class GetUserByEmailUseCase
	implements IUserUseCase.IGetUserByEmailUseCase
{
	constructor(
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository
	) {}

	execute = async (email: string): Promise<Dto.User.UserDto | undefined> => {
		const user = await this.userRepository.getByEmail(email)

		return user ? Mappers.User.entityToDto(user) : undefined
	}
}
