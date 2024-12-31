import { Dto } from '../../../models'

export interface ICreateCreditCardUseCase {
	execute(
		creditCard: Dto.CreditCard.CreateCreditCardDto
	): Promise<Dto.CreditCard.CreditCardDto>
}

export interface IDeleteCreditCardUseCase {
	execute(creditCardId: string): Promise<void>
}

export interface IGetCreditCardByUserUseCase {
	execute(userId: string): Promise<Dto.CreditCard.CreditCardDto[]>
}

export interface IUpdateCreditCardUseCase {
	execute(
		creditCard: Dto.CreditCard.UpdateCreditCardDto
	): Promise<Dto.CreditCard.CreditCardDto>
}
