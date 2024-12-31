import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { CONSTANTS } from '../../../constants'
import { WinstonLogger } from '../../../infrastructure/logger/winston.logger'
import { Dto, Model } from '../../../models'
import { AuthService } from '../../auth/auth.service'

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
	logger = new WinstonLogger()

	constructor(private readonly authService: AuthService) {
		super({
			clientID: CONSTANTS.ENV.GITHUB_CLIENT_ID,
			clientSecret: CONSTANTS.ENV.GITHUB_CLIENT_SECRET,
			callbackURL: CONSTANTS.ENV.GITHUB_CALLBACK_URL,
			scope: ['user:email']
		})
		this.logger.log(
			`🐙✨ GitHubStrategy initialized with callback URL: ${CONSTANTS.ENV.GITHUB_CALLBACK_URL} ✨🐙`
		)
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Model.GitHubProfile
	): Promise<Dto.Auth.LoginResponseDto> {
		const { emails, displayName } = profile
		if (!emails || !emails[0].value) {
			throw new UnauthorizedException('GitHub user has no email associated')
		}
		const email = emails[0].value

		return await this.authService.strategyAuth(email, displayName)
	}
}
