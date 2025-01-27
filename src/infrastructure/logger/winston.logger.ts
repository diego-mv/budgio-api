import { LoggerService } from '@nestjs/common'
import { createLogger, format, Logger, transports } from 'winston'
import { CONSTANTS } from '../../constants'

export class WinstonLogger implements LoggerService {
	private logger: Logger

	constructor() {
		this.logger = createLogger({
			level: CONSTANTS.ENV.LOG_LEVEL || 'info',
			format: format.combine(
				format.colorize(),
				format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
				format.printf(
					(info) => `${info.timestamp} ${info.level}: ${info.message}`
				)
			),
			transports: [new transports.Console()]
		})
	}

	log(message: string) {
		this.logger.info(message)
	}

	error(message: string, trace: string) {
		this.logger.error(`${message} - ${trace}`)
	}

	warn(message: string) {
		this.logger.warn(message)
	}

	debug(message: string) {
		this.logger.debug(message)
	}

	verbose(message: string) {
		this.logger.verbose(message)
	}
}
