import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { WinstonLogger } from '../../infrastructure/logger/winston.logger'
import { Dto } from '../../models'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	private readonly logger = new WinstonLogger()

	constructor(private readonly authService: AuthService) {}

	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubLogin() {}

	@Get('github/callback')
	@UseGuards(AuthGuard('github'))
	githubLoginCallback(@Req() req, @Res() res) {
		return this.authService.callback(req, res)
	}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleLogin() {}

	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	googleAuthRedirect(@Req() req, @Res() res) {
		return this.authService.callback(req, res)
	}

	@Post('refresh')
	async refresh(@Body() body: Dto.Auth.RefreshTokenDto) {
		return this.authService.refreshToken(body)
	}
}
