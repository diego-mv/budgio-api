import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UnauthorizedException,
	UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { WinstonLogger } from '../../infrastructure/logger/winston.logger'
import { RefreshTokenUseCase } from './use-cases/refresh-token.uc'
import { ApiTags } from '@nestjs/swagger'
import { CallbackUseCase } from './use-cases/callback.uc'
import { Dto } from '../../models'
import { HandleErrors } from '../../infrastructure/server/decorators/handle-error.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	private readonly logger = new WinstonLogger()

	constructor(
		private readonly refreshTokenUseCase: RefreshTokenUseCase,
		private readonly callback: CallbackUseCase
	) {}

	@HandleErrors()
	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubLogin() {}

	@HandleErrors()
	@Get('github/callback')
	@UseGuards(AuthGuard('github'))
	githubLoginCallback(@Req() req) {
		return this.callback.execute(req)
	}

	@HandleErrors()
	@Post('refresh')
	async refresh(@Body() body: Dto.Auth.RefreshTokenDto) {
		try {
			return this.refreshTokenUseCase.execute(body.refreshToken)
		} catch (err) {
			this.logger.error('Error refreshing token', err)
			throw new UnauthorizedException('Invalid refresh token')
		}
	}
}
