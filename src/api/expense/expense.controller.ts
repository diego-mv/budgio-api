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
import { JwtAuthGuard } from '../../infrastructure/server/guards/jwt-auth.guard'
import { Dto, Schema } from '../../models'
import { CreateExpenseUseCase } from './use-cases/create.uc'
import { DeleteExpenseUseCase } from './use-cases/delete.uc'
import { GetByUserExpenseUseCase } from './use-cases/get-by-user.uc'
import { UpdateExpenseUseCase } from './use-cases/update.uc'
import { User } from '../../infrastructure/server/decorators/current-user.decorator'

@UseGuards(JwtAuthGuard)
@ApiSecurity('bearer')
@ApiTags('expense')
@Controller('expense')
export class ExpenseController {
	constructor(
		private readonly getByUserExpenseUseCase: GetByUserExpenseUseCase,
		private readonly createExpenseUseCase: CreateExpenseUseCase,
		private readonly updateExpenseUseCase: UpdateExpenseUseCase,
		private readonly deleteExpenseUseCase: DeleteExpenseUseCase
	) {}

	@Get('by-user')
	getByUser(@User() user: Dto.User.UserDto) {
		return this.getByUserExpenseUseCase.execute(user.id)
	}

	@Post()
	create(
		@Body(new ZodValidationPipe(Schema.Expense.CreateExpenseSchema))
		expense: Dto.Expense.CreateExpenseDto
	) {
		return this.createExpenseUseCase.execute(expense)
	}

	@Put()
	update(
		@Body(new ZodValidationPipe(Schema.Expense.UpdateExpenseSchema))
		expense: Dto.Expense.UpdateExpenseDto
	) {
		return this.updateExpenseUseCase.execute(expense)
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.deleteExpenseUseCase.execute(id)
	}
}
