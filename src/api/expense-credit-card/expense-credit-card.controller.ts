import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { Multer } from 'multer'
import { ZodValidationPipe } from 'nestjs-zod'
import { JwtAuthGuard } from '../../infrastructure/server/guards/jwt-auth.guard'
import { CreateExpenseCreditCardUseCase } from './use-cases/create.uc'
import { DeleteExpenseCreditCardUseCase } from './use-cases/delete.uc'
import { ImportExpensesCreditCardUseCase } from './use-cases/import-expenses-credit-card.uc'
import { UpdateExpenseCreditCardUseCase } from './use-cases/update.uc'
import { Dto, Schema } from '../../models'
import { GetByCreditCardExpenseCreditCardUseCase } from './use-cases/get-by-credit-card.uc'

@UseGuards(JwtAuthGuard)
@ApiSecurity('bearer')
@ApiTags('expense-credit-card')
@Controller('expense-credit-card')
export class ExpenseCreditCardController {
	constructor(
		private readonly getByCreditCardExpenseCreditCardUseCase: GetByCreditCardExpenseCreditCardUseCase,
		private readonly importExpensesCreditCardUseCase: ImportExpensesCreditCardUseCase,
		private readonly createExpenseCreditCardUseCase: CreateExpenseCreditCardUseCase,
		private readonly updateExpenseCreditCardUseCase: UpdateExpenseCreditCardUseCase,
		private readonly deleteExpenseCreditCardUseCase: DeleteExpenseCreditCardUseCase
	) {}

	@Get('/by-credit-card/:creditCardId')
	getByCreditCard(@Param('creditCardId') creditCardId: string) {
		return this.getByCreditCardExpenseCreditCardUseCase.execute(creditCardId)
	}

	@Post('import-expenses/:creditCardId')
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
					description: 'Excel file containing the recipients to import'
				}
			},
			required: ['file']
		}
	})
	importExpenses(
		@Param('creditCardId') creditCardId: string,
		@UploadedFile() file: Multer.File
	) {
		return this.importExpensesCreditCardUseCase.execute(
			creditCardId,
			file.buffer
		)
	}

	@Post()
	create(
		@Body(
			new ZodValidationPipe(
				Schema.ExpenseCreditCard.CreateExpenseCreditCardSchema
			)
		)
		expenseCreditCard: Dto.ExpenseCreditCard.CreateExpenseCreditCardDto
	) {
		return this.createExpenseCreditCardUseCase.execute(expenseCreditCard)
	}

	@Put()
	update(
		@Body(
			new ZodValidationPipe(
				Schema.ExpenseCreditCard.UpdateExpenseCreditCardSchema
			)
		)
		expenseCreditCard: Dto.ExpenseCreditCard.UpdateExpenseCreditCardDto
	) {
		return this.updateExpenseCreditCardUseCase.execute(expenseCreditCard)
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.deleteExpenseCreditCardUseCase.execute(id)
	}
}
