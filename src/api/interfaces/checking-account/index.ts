import { Dto } from '../../../models'

export interface ICreateCheckingAccountUseCase {
	execute: (
		checkingAccount: Dto.CheckingAccount.CreateCheckingAccountDto
	) => Promise<Dto.CheckingAccount.CheckingAccountDto>
}

export interface IUpdateCheckingAccountUseCase {
	execute: (
		checkingAccount: Dto.CheckingAccount.UpdateCheckingAccountDto
	) => Promise<Dto.CheckingAccount.CheckingAccountDto>
}

export interface IDeleteCheckingAccountUseCase {
	execute: (checkingAccountId: string) => Promise<void>
}

export interface IGetCheckingAccountByUserUseCase {
	execute: (userId: string) => Promise<Dto.CheckingAccount.CheckingAccountDto[]>
}
