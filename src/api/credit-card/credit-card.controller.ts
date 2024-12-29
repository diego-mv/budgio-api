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
import { ZodValidationPipe } from 'nestjs-zod'
import { User } from '../../infrastructure/server/decorators/current-user.decorator'
import { JwtAuthGuard } from '../../infrastructure/server/guards/jwt-auth.guard'
import { CreateCreditCardUseCase } from './use-cases/create.uc'
import { GetCreditCardByUserUseCase } from './use-cases/get-by-user.uc'
import { UpdateCreditCardUseCase } from './use-cases/update.uc'
import { Dto, Schema } from '../../models'
import { DeleteCreditCardUseCase } from './use-cases/delete.uc'

@UseGuards(JwtAuthGuard)
@ApiSecurity('bearer')
@ApiTags('credit-card')
@Controller('credit-card')
export class CreditCardController {
	constructor(
		private readonly getCreditCardByUserUseCase: GetCreditCardByUserUseCase,
		private readonly createCreditCardUseCase: CreateCreditCardUseCase,
		private readonly updateCreditCardUseCase: UpdateCreditCardUseCase,
		private readonly deleteCreditCardUseCase: DeleteCreditCardUseCase
	) {}

	@Get('by-user')
	getCreditCards(@User() user: Dto.User.UserDto) {
		return this.getCreditCardByUserUseCase.execute(user.id)
	}

	@Post()
	createCreditCard(
		@Body(new ZodValidationPipe(Schema.CreditCard.CreateCreditCardSchema))
		creditCard: Dto.CreditCard.CreateCreditCardDto
	) {
		return this.createCreditCardUseCase.execute(creditCard)
	}

	@Put()
	updateCreditCard(
		@Body(new ZodValidationPipe(Schema.CreditCard.UpdateCreditCardSchema))
		creditCard: Dto.CreditCard.UpdateCreditCardDto
	) {
		return this.updateCreditCardUseCase.execute(creditCard)
	}

	@Delete(':id')
	deleteCreditCard(@Param('id') id: string) {
		return this.deleteCreditCardUseCase.execute(id)
	}
}
