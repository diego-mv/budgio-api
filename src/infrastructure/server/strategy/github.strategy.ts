import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { CONSTANTS } from '../../../constants'
import { DepInject } from '../../../dep-inject'
import { IUserRepository } from '../../../domain/interfaces/repositories/user.repository'
import { WinstonLogger } from '../../logger/winston.logger'
import { generateJwtToken, generateRefreshToken } from '../jwt'
import { Mappers } from '../../../mappers'
import { Dto, Model } from '../../../models'

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
	logger = new WinstonLogger()
	private userRepository: IUserRepository =
		DepInject.Repositories.userPostgresRepository

	constructor() {
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

		let user = await this.userRepository.getByEmail(emails[0].value)

		if (!user) {
			user = Mappers.User.createToNewEntity({
				email: emails[0].value,
				name: displayName
			})
		}

		const userDto = Mappers.User.entityToDto(user)

		const jwtAccess = generateJwtToken(userDto)
		const jwtRefresh = generateRefreshToken(userDto)

		return {
			user: userDto,
			accessToken: jwtAccess,
			refreshToken: jwtRefresh
		}
	}
}
