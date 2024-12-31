import { DataSource, DataSourceOptions } from 'typeorm'
import { CONSTANTS } from '../../constants'
import {
	CheckingAccount,
	CreditCard,
	Expense,
	ExpenseCreditCard,
	User
} from '../entities'
import { WinstonLogger } from '../logger/winston.logger'

const allEntities = [
	User,
	CreditCard,
	CheckingAccount,
	Expense,
	ExpenseCreditCard
]

export class SingletonConnection {
	private static instance: SingletonConnection
	private static dataSource: DataSource

	constructor() {
		this.initializeDataSource()
	}

	private static dataConfig: DataSourceOptions = {
		type: 'postgres',
		host: CONSTANTS.ENV.DATABASE_HOST,
		port: Number(CONSTANTS.ENV.DATABASE_PORT || 5432),
		username: String(CONSTANTS.ENV.DATABASE_USER),
		password: String(CONSTANTS.ENV.DATABASE_PASSWORD),
		database: String(CONSTANTS.ENV.DATABASE_NAME),
		entities: allEntities,
		synchronize: false,
		extra: {
			timezone: 'UTC'
		}
	}

	private initializeDataSource() {
		const logger = new WinstonLogger()
		SingletonConnection.dataConfig = {
			type: 'postgres',
			host: CONSTANTS.ENV.DATABASE_HOST,
			port: Number(CONSTANTS.ENV.DATABASE_PORT || 5432),
			username: String(CONSTANTS.ENV.DATABASE_USER),
			password: String(CONSTANTS.ENV.DATABASE_PASSWORD),
			database: String(CONSTANTS.ENV.DATABASE_NAME),
			entities: allEntities,
			synchronize: false
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
						err
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
