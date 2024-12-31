import { Dto } from '../../../models'

export interface ICreateUserUseCase {
	execute: (user: Dto.User.CreateUserDto) => Promise<Dto.User.UserDto>
}

export interface IGetUserByEmailUseCase {
	execute: (email: string) => Promise<Dto.User.UserDto>
}

export interface IGetUserUseCase {
	execute: (userId: string) => Promise<Dto.User.UserDto>
}
