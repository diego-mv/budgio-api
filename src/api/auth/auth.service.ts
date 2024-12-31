import { Inject, Injectable } from '@nestjs/common'
import { Dto } from '../../models'
import { IAuthUseCase, IUserUseCase } from '../interfaces'

@Injectable()
export class AuthService {
	constructor(
		@Inject('RefreshTokenUseCase')
		private readonly refreshTokenUseCase: IAuthUseCase.IRefreshTokenUseCase,
		@Inject('CallbackUseCase')
		private readonly callbackUseCase: IAuthUseCase.ICallbackUseCase,
		@Inject('GetUserByEmailUseCase')
		private readonly getUserByEmailUseCase: IUserUseCase.IGetUserByEmailUseCase,
		@Inject('CreateUserUseCase')
		private readonly createUserUseCase: IUserUseCase.ICreateUserUseCase
	) {}

	refreshToken = async (dto: Dto.Auth.RefreshTokenDto) => {
		return await this.refreshTokenUseCase.execute(dto.refreshToken)
	}

	callback = async (request: any) => {
		return await this.callbackUseCase.execute(request)
	}

	getUserByEmail = async (email: string) => {
		return await this.getUserByEmailUseCase.execute(email)
	}

	createUser = async (
		displayName: string,
		email: string
	): Promise<Dto.User.UserDto> => {
		const user: Dto.User.UserDto = {
			email,
			name: displayName,
			id: ''
		}
		return await this.createUserUseCase.execute(user)
	}
}
