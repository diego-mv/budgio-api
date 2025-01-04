import { Response } from 'express'
import { Dto } from '../../../models'

export interface ICallbackUseCase {
	execute: (req: any, response: Response) => Promise<void>
}

export interface IRefreshTokenUseCase {
	execute: (refreshToken: string) => Promise<Dto.Auth.LoginResponseDto>
}
