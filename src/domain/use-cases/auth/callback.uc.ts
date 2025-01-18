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
		res.cookie('access_token', data.accessToken, {
			httpOnly: false,
			secure: true,
			sameSite: 'none',
			domain: '.onrender.com'
		})
		res.cookie('refresh_token', data.refreshToken, {
			httpOnly: false,
			secure: true,
			sameSite: 'none',
			domain: '.onrender.com'
		})
		res.cookie('user', JSON.stringify(data.user), {
			httpOnly: false,
			secure: true,
			sameSite: 'none',
			domain: '.onrender.com'
		})

		return res.redirect(`${CONSTANTS.ENV.CLIENT_HOST}/auth/callback`)
	}
}
