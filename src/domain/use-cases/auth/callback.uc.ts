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
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			signed: true,
			domain: '.onrender.com',
			maxAge: 1000 * 60 * 60,
			expires: new Date(Date.now() + 1000 * 60 * 60)
		})
		res.cookie('refresh_token', data.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			signed: true,
			domain: '.onrender.com',
			maxAge: 1000 * 60 * 60,
			expires: new Date(Date.now() + 1000 * 60 * 60)
		})
		res.cookie('user', JSON.stringify(data.user), {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			signed: true,
			domain: '.onrender.com',
			maxAge: 1000 * 60 * 60,
			expires: new Date(Date.now() + 1000 * 60 * 60)
		})

		return res.redirect(`${CONSTANTS.ENV.CLIENT_HOST}/auth/callback`)
	}
}
