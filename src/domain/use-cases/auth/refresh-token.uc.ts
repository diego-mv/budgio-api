import { Inject, Injectable } from '@nestjs/common'
import { IUserRepository } from '../../interfaces/repositories/user.repository'
import { Dto } from '../../../models'
import { generateJwtToken, verifyRefreshToken } from '../../../api/server/jwt'
import { IAuthUseCase } from '../../../api/interfaces'

@Injectable()
export class RefreshTokenUseCase implements IAuthUseCase.IRefreshTokenUseCase {
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
