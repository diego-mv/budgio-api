import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { GitHubStrategy } from '../../infrastructure/server/strategy/github.strategy'
import { AuthController } from './auth.controller'
import { RefreshTokenUseCase } from './use-cases/refresh-token.uc'
import { DepInject } from '../../dep-inject'
import { CallbackUseCase } from './use-cases/callback.uc'

@Module({
	imports: [PassportModule],
	controllers: [AuthController],
	providers: [
		GitHubStrategy,
		CallbackUseCase,
		RefreshTokenUseCase,
		{
			provide: 'UserRepository',
			useValue: DepInject.Repositories.userPostgresRepository
		}
	]
})
export class AuthModule {}
