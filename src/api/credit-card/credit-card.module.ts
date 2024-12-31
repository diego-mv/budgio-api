import { Module } from '@nestjs/common'
import { IoC } from '../../ioc'
import { CreditCardController } from './credit-card.controller'
import { CreditCardService } from './credit-card.service'

@Module({
	controllers: [CreditCardController],
	providers: [
		CreditCardService,
		{
			provide: 'GetCreditCardByUserUseCase',
			useFactory: IoC.UseCases.CreditCard.getCreditCardByUserUseCase
		},
		{
			provide: 'CreateCreditCardUseCase',
			useFactory: IoC.UseCases.CreditCard.createCreditCardUseCase
		},
		{
			provide: 'UpdateCreditCardUseCase',
			useFactory: IoC.UseCases.CreditCard.updateCreditCardUseCase
		},
		{
			provide: 'DeleteCreditCardUseCase',
			useFactory: IoC.UseCases.CreditCard.deleteCreditCardUseCase
		}
	]
})
export class CreditCardModule {}
