import { Inject, Injectable } from '@nestjs/common'
import { Dto } from '../../models'
import { IAuthUseCase, IUserUseCase } from '../interfaces'
import { generateJwtToken, generateRefreshToken } from '../server/jwt'
import { Response } from 'express'

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

	callback = async (request: any, response: Response) => {
		return await this.callbackUseCase.execute(request, response)
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

	strategyAuth = async (
		email: string,
		name: string
	): Promise<Dto.Auth.LoginResponseDto> => {
		let user = await this.getUserByEmail(email)

		if (!user) {
			user = await this.createUser(name, email)
		}

		const jwtAccess = generateJwtToken(user)
		const jwtRefresh = generateRefreshToken(user)

		return {
			user: user,
			accessToken: jwtAccess,
			refreshToken: jwtRefresh
		}
	}
}
