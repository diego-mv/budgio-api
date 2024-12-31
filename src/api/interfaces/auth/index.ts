import { Dto } from '../../../models'

export interface ICallbackUseCase {
	execute: (
		req: Dto.Auth.LoginResponseDto
	) => Promise<Dto.Auth.LoginResponseDto>
}

export interface IRefreshTokenUseCase {
	execute: (refreshToken: string) => Promise<Dto.Auth.LoginResponseDto>
}
