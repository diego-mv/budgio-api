import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards
} from '@nestjs/common'
import { ApiSecurity, ApiTags } from '@nestjs/swagger'
import { Dto, Schema } from '../../models'
import { Decorators } from '../server/decorators'
import { Guards } from '../server/guards'
import { Pipes } from '../server/pipes'
import { CreditCardService } from './credit-card.service'

@UseGuards(Guards.JwtAuthGuard)
@ApiSecurity('bearer')
@ApiTags('credit-card')
@Controller('credit-card')
export class CreditCardController {
	constructor(private readonly creditCardService: CreditCardService) {}

	@Get('by-user')
	getCreditCards(@Decorators.User() user: Dto.User.UserDto) {
		return this.creditCardService.getCreditCardByUser(user.id)
	}

	@Post()
	createCreditCard(
		@Body(new Pipes.ZodValidationPipe(Schema.CreditCard.CreateCreditCardSchema))
		creditCard: Dto.CreditCard.CreateCreditCardDto
	) {
		return this.creditCardService.createCreditCard(creditCard)
	}

	@Put()
	updateCreditCard(
		@Body(new Pipes.ZodValidationPipe(Schema.CreditCard.UpdateCreditCardSchema))
		creditCard: Dto.CreditCard.UpdateCreditCardDto
	) {
		return this.creditCardService.updateCreditCard(creditCard)
	}

	@Delete(':id')
	deleteCreditCard(@Param('id') id: string) {
		return this.creditCardService.deleteCreditCard(id)
	}
}
