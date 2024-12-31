import { Inject, Injectable } from '@nestjs/common'
import { IUserUseCase } from '../interfaces'

@Injectable()
export class UserService {
	constructor(
		@Inject('GetUserUseCase')
		private readonly getUserUseCase: IUserUseCase.IGetUserUseCase,
		@Inject('CreateUserUseCase')
		private readonly createUserUseCase: IUserUseCase.ICreateUserUseCase
	) {}

	getUserById = async (id: string) => {
		return this.getUserUseCase.execute(id)
	}
}
