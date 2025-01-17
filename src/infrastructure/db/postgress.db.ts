import { DataSource, DataSourceOptions } from 'typeorm'
import { CONSTANTS } from '../../constants'
import {
	CheckingAccount,
	CreditCard,
	Expense,
	ExpenseCreditCard,
	User,
	HistoryCheckingAccount
} from '../entities'
import { WinstonLogger } from '../logger/winston.logger'

const allEntities = [
	User,
	CreditCard,
	CheckingAccount,
	Expense,
	ExpenseCreditCard,
	HistoryCheckingAccount
]

export class SingletonConnection {
	private static instance: SingletonConnection
	private static dataSource: DataSource

	constructor() {
		this.initializeDataSource()
	}

	private static dataConfig: DataSourceOptions = {
		type: 'postgres',
		url: `postgres://${CONSTANTS.ENV.DATABASE_USER}:${CONSTANTS.ENV.DATABASE_PASSWORD}@${CONSTANTS.ENV.DATABASE_HOST}:${CONSTANTS.ENV.DATABASE_PORT || 5432}/${CONSTANTS.ENV.DATABASE_NAME}`,
		entities: allEntities,
		synchronize: false,
		extra: {
			timezone: 'UTC'
		},
		ssl: {
			rejectUnauthorized: false
		}
	}

	private initializeDataSource() {
		const logger = new WinstonLogger()
		SingletonConnection.dataConfig = {
			type: 'postgres',
			url: `postgres://${CONSTANTS.ENV.DATABASE_USER}:${CONSTANTS.ENV.DATABASE_PASSWORD}@${CONSTANTS.ENV.DATABASE_HOST}:${CONSTANTS.ENV.DATABASE_PORT || 5432}/${CONSTANTS.ENV.DATABASE_NAME}`,
			entities: allEntities,
			synchronize: false,
			extra: {
				timezone: 'UTC'
			},
			ssl: {
				rejectUnauthorized: false
			}
		}

		if (!SingletonConnection.dataSource) {
			SingletonConnection.dataSource = new DataSource(
				SingletonConnection.dataConfig
			)

			SingletonConnection.dataSource
				.initialize()
				.then(() => {
					logger.log(
						`🗄️✨ Connected to PostgreSQL database '${CONSTANTS.ENV.DATABASE_NAME}' at ${CONSTANTS.ENV.DATABASE_HOST}:${CONSTANTS.ENV.DATABASE_PORT}! ✨🗄️`
					)
				})
				.catch((err) => {
					logger.error(
						'🗄️❌ Error during PostgreSQL connection initialization! ❌🗄️',
						{
							...err,
							url: `postgres://${CONSTANTS.ENV.DATABASE_USER}:PASSWORD@${CONSTANTS.ENV.DATABASE_HOST}:${CONSTANTS.ENV.DATABASE_PORT || 5432}/${CONSTANTS.ENV.DATABASE_NAME}`
						}
					)
				})
		}
	}

	public static getConnection() {
		if (!SingletonConnection.instance) {
			SingletonConnection.instance = new SingletonConnection()
		}
		return SingletonConnection.dataSource
	}
}
