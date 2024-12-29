import { Injectable } from '@nestjs/common'
import { Dto } from '../../../models'

@Injectable()
export class CallbackUseCase {
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
