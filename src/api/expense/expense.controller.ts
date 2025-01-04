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
import { ExpenseService } from './expense.service'

@UseGuards(Guards.JwtAuthGuard)
@ApiSecurity('bearer')
@ApiTags('expense')
@Controller('expense')
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) {}

	@Get('by-user')
	getByUser(
		@Decorators.User() user: Dto.User.UserDto,
		@Param('page') page?: number,
		@Param('pageSize') pageSize?: number
	) {
		return this.expenseService.getByUserExpense(user.id, page, pageSize)
	}

	@Post()
	create(
		@Decorators.User() user: Dto.User.UserDto,
		@Body(new Pipes.ZodValidationPipe(Schema.Expense.CreateExpenseSchema))
		expense: Dto.Expense.CreateExpenseDto
	) {
		return this.expenseService.createExpense(user.id, expense)
	}

	@Put()
	update(
		@Body(new Pipes.ZodValidationPipe(Schema.Expense.UpdateExpenseSchema))
		expense: Dto.Expense.UpdateExpenseDto
	) {
		return this.expenseService.updateExpense(expense)
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.expenseService.deleteExpense(id)
	}
}
