import { Inject, Injectable } from '@nestjs/common'
import { IUserRepository } from '../../../domain/interfaces/repositories/user.repository'
import {
	generateJwtToken,
	verifyRefreshToken
} from '../../../infrastructure/server/jwt'
import { Dto } from '../../../models'

@Injectable()
export class RefreshTokenUseCase {
	constructor(
		@Inject('UserRepository') private readonly userRepository: IUserRepository
	) {}

	execute = async (
		refreshToken: string
	): Promise<Dto.Auth.LoginResponseDto> => {
		const decoded = verifyRefreshToken(refreshToken)

		const userId = decoded.sub
		const user = await this.userRepository.getById(userId)
		const newAccessToken = generateJwtToken(user)
		const newRefreshToken = generateJwtToken(user)

		return {
			user,
			accessToken: newAccessToken,
			refreshToken: newRefreshToken
		}
	}
}
