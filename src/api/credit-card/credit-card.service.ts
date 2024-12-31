import { Inject, Injectable } from '@nestjs/common'
import { Dto } from '../../models'
import { ICreditCardUseCase } from '../interfaces'

@Injectable()
export class CreditCardService {
	constructor(
		@Inject('GetCreditCardByUserUseCase')
		private readonly getCreditCardByUserUseCase: ICreditCardUseCase.IGetCreditCardByUserUseCase,
		@Inject('CreateCreditCardUseCase')
		private readonly createCreditCardUseCase: ICreditCardUseCase.ICreateCreditCardUseCase,
		@Inject('UpdateCreditCardUseCase')
		private readonly updateCreditCardUseCase: ICreditCardUseCase.IUpdateCreditCardUseCase,
		@Inject('DeleteCreditCardUseCase')
		private readonly deleteCreditCardUseCase: ICreditCardUseCase.IDeleteCreditCardUseCase
	) {}

	getCreditCardByUser = async (id: string) => {
		return await this.getCreditCardByUserUseCase.execute(id)
	}

	createCreditCard = async (creditCard: Dto.CreditCard.CreateCreditCardDto) => {
		return await this.createCreditCardUseCase.execute(creditCard)
	}

	updateCreditCard = async (creditCard: Dto.CreditCard.UpdateCreditCardDto) => {
		return await this.updateCreditCardUseCase.execute(creditCard)
	}

	deleteCreditCard = async (id: string) => {
		return await this.deleteCreditCardUseCase.execute(id)
	}
}
