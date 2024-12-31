import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { IoC } from '../../ioc'
import { Guards } from '../server/guards'
import { Strategies } from '../server/strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [PassportModule],
	controllers: [AuthController],
	providers: [
		Guards.JwtAuthGuard,
		Strategies.JwtStrategy,
		Strategies.GitHubStrategy,
		Strategies.GoogleStrategy,
		AuthService,
		{
			provide: 'RefreshTokenUseCase',
			useFactory: IoC.UseCases.Auth.refreshTokenUseCase
		},
		{
			provide: 'CallbackUseCase',
			useFactory: IoC.UseCases.Auth.callBackUseCase
		},
		{
			provide: 'GetUserByEmailUseCase',
			useFactory: IoC.UseCases.User.getUserByEmailUseCase
		},
		{
			provide: 'CreateUserUseCase',
			useFactory: IoC.UseCases.User.createUserUseCase
		}
	]
})
export class AuthModule {}
