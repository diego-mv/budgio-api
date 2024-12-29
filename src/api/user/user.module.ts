import { Module } from '@nestjs/common'
import { CreateUserUseCase } from './use-cases/create.uc'
import { GetUserUseCase } from './use-cases/get.uc'
import { UserController } from './user.controller'
import { DepInject } from '../../dep-inject'

@Module({
	imports: [],
	controllers: [UserController],
	providers: [
		CreateUserUseCase,
		GetUserUseCase,
		{
			provide: 'UserRepository',
			useValue: DepInject.Repositories.userPostgresRepository
		},
		{
			provide: 'EmailService',
			useValue: DepInject.Services.emailMailgunService
		}
	]
})
export class UserModule {
	constructor() {}
}
