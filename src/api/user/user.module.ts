import { Module } from '@nestjs/common'
import { IoC } from '../../ioc'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [],
	controllers: [UserController],
	providers: [
		UserService,
		{
			provide: 'CreateUserUseCase',
			useFactory: IoC.UseCases.User.createUserUseCase
		},
		{
			provide: 'GetUserUseCase',
			useFactory: IoC.UseCases.User.getUserUseCase
		},
		{
			provide: 'EmailService',
			useFactory: IoC.Services.emailMailgunService
		}
	]
})
export class UserModule {
	constructor() {}
}
