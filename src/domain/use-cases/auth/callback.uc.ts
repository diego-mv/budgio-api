import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { IAuthUseCase } from '../../../api/interfaces'
import { CONSTANTS } from '../../../constants'

@Injectable()
export class CallbackUseCase implements IAuthUseCase.ICallbackUseCase {
	async execute(req: any, res: Response): Promise<void> {
		const data = {
			user: req.user.user,
			accessToken: req.user.accessToken,
			refreshToken: req.user.refreshToken
		}
		const redirectUrl = `${CONSTANTS.ENV.CLIENT_HOST}/auth/callback?access_token=${encodeURIComponent(data.accessToken)}&refresh_token=${encodeURIComponent(data.refreshToken)}`

		return res.redirect(redirectUrl)
	}
}
