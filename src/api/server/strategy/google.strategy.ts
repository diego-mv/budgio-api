import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { CONSTANTS } from '../../../constants'
import { AuthService } from '../../auth/auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private readonly authService: AuthService) {
		super({
			clientID: CONSTANTS.ENV.GOOGLE_CLIENT_ID,
			clientSecret: CONSTANTS.ENV.GOOGLE_CLIENT_SECRET,
			callbackURL: CONSTANTS.ENV.GOOGLE_CALLBACK_URL,
			scope: ['email', 'profile']
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback
	): Promise<any> {
		const { emails, displayName } = profile
		if (!emails || !emails[0].value) {
			throw new UnauthorizedException('GitHub user has no email associated')
		}
		const email = emails[0].value

		return await this.authService.strategyAuth(email, displayName)
	}
}
