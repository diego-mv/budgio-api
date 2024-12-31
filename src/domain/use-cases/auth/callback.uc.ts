import { Injectable } from '@nestjs/common'
import { Dto } from '../../../models'
import { IAuthUseCase } from '../../../api/interfaces'

@Injectable()
export class CallbackUseCase implements IAuthUseCase.ICallbackUseCase {
	async execute(
		req: Dto.Auth.LoginResponseDto
	): Promise<Dto.Auth.LoginResponseDto> {
		return {
			user: req.user,
			accessToken: req.accessToken,
			refreshToken: req.refreshToken
		}
	}
}
