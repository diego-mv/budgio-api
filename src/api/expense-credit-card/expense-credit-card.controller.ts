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
import { Dto, Schema } from '../../models'
import { Guards } from '../server/guards'
import { Pipes } from '../server/pipes'
import { ExpenseCreditCardService } from './expense-credit-card.service'

@UseGuards(Guards.JwtAuthGuard)
@ApiSecurity('bearer')
@ApiTags('expense-credit-card')
@Controller('expense-credit-card')
export class ExpenseCreditCardController {
	constructor(
		private readonly expenseCreditCardService: ExpenseCreditCardService
	) {}

	@Get('/by-credit-card/:creditCardId')
	getByCreditCard(@Param('creditCardId') creditCardId: string) {
		return this.expenseCreditCardService.getByCreditCardExpenseCreditCard(
			creditCardId
		)
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
		return this.expenseCreditCardService.importExpensesCreditCard(
			creditCardId,
			file.buffer
		)
	}

	@Post()
	create(
		@Body(
			new Pipes.ZodValidationPipe(
				Schema.ExpenseCreditCard.CreateExpenseCreditCardSchema
			)
		)
		expenseCreditCard: Dto.ExpenseCreditCard.CreateExpenseCreditCardDto
	) {
		return this.expenseCreditCardService.createExpenseCreditCard(
			expenseCreditCard
		)
	}

	@Put()
	update(
		@Body(
			new Pipes.ZodValidationPipe(
				Schema.ExpenseCreditCard.UpdateExpenseCreditCardSchema
			)
		)
		expenseCreditCard: Dto.ExpenseCreditCard.UpdateExpenseCreditCardDto
	) {
		return this.expenseCreditCardService.updateExpenseCreditCard(
			expenseCreditCard
		)
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.expenseCreditCardService.deleteExpenseCreditCard(id)
	}
}
