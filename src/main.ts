import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dotenv from 'dotenv'
import { patchNestJsSwagger } from 'nestjs-zod'
import { AppModule } from './app.module'
import { CONSTANTS } from './constants'
import { WinstonLogger } from './infrastructure/logger/winston.logger'
dotenv.config()

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new WinstonLogger(),
		cors: {
			origin: '*'
		}
	})
	const enableSwagger = CONSTANTS.ENV.ENABLE_SWAGGER
	if (enableSwagger) {
		patchNestJsSwagger()
		const config = new DocumentBuilder()
			.setTitle('Budio API')
			.setDescription('Backend Budgio')
			.setVersion('1.0')
			.addBearerAuth()
			.build()

		const document = () => SwaggerModule.createDocument(app, config)
		SwaggerModule.setup('swagger', app, document, {
			jsonDocumentUrl: 'swagger/json'
		})
	}

	// app.useGlobalFilters(new Filters.GlobalExceptionFilter())

	await app.listen(CONSTANTS.ENV.API_PORT ?? 8080, () => {
		Logger.log(
			`🚀✨ Server running on port ${CONSTANTS.ENV.API_PORT ?? 8080} with log level: '${CONSTANTS.ENV.LOG_LEVEL || 'info'}' 🚀✨`
		)
		if (enableSwagger) {
			Logger.log(`📜✨ Swagger running on /swagger ✨📜`)
		}
	})
}

bootstrap()
