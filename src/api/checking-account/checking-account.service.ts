import { Inject, Injectable } from '@nestjs/common'
import { Dto } from '../../models'
import { ICheckingAccountUseCase } from '../interfaces'

@Injectable()
export class CheckingAccountService {
	constructor(
		@Inject('GetCheckingAccountByUserUseCase')
		private readonly getCheckingAccountByUserUseCase: ICheckingAccountUseCase.IGetCheckingAccountByUserUseCase,
		@Inject('CreateCheckingAccountUseCase')
		private readonly createCheckingAccountUseCase: ICheckingAccountUseCase.ICreateCheckingAccountUseCase,
		@Inject('UpdateCheckingAccountUseCase')
		private readonly updateCheckingAccountUseCase: ICheckingAccountUseCase.IUpdateCheckingAccountUseCase,
		@Inject('DeleteCheckingAccountUseCase')
		private readonly deleteCheckingAccountUseCase: ICheckingAccountUseCase.IDeleteCheckingAccountUseCase
	) {}

	getCheckingAccountsByUser = async (id: string) => {
		return await this.getCheckingAccountByUserUseCase.execute(id)
	}

	createCheckingAccount = async (
		checkingAccount: Dto.CheckingAccount.CreateCheckingAccountDto
	) => {
		return await this.createCheckingAccountUseCase.execute(checkingAccount)
	}

	updateCheckingAccount = async (
		checkingAccount: Dto.CheckingAccount.UpdateCheckingAccountDto
	) => {
		return await this.updateCheckingAccountUseCase.execute(checkingAccount)
	}

	deleteCheckingAccount = async (id: string) => {
		return await this.deleteCheckingAccountUseCase.execute(id)
	}
}
