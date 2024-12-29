import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus
} from '@nestjs/common'
import { Response } from 'express'
import { WinstonLogger } from '../../logger/winston.logger'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	logger = new WinstonLogger()

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR

		const message =
			exception instanceof HttpException
				? exception.getResponse()
				: { message: 'Internal server error' }

		this.logger.error('Error', JSON.stringify(exception))

		response.status(status).json({
			statusCode: status,
			message: message,
			timestamp: new Date().toISOString()
		})
	}
}
