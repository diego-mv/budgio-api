import * as dotenv from 'dotenv'
import { IEnvConfig } from '../domain/interfaces/constants/env.interface'
dotenv.config()

export const ENV: IEnvConfig = {
	DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
	DATABASE_PORT: parseInt(process.env.DATABASE_PORT || '5432', 10),
	DATABASE_USER: process.env.DATABASE_USER || '',
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
	DATABASE_NAME: process.env.DATABASE_NAME || '',
	ENABLE_SWAGGER: process.env.ENABLE_SWAGGER === 'true',
	APP_PORT: parseInt(process.env.APP_PORT || '3000', 10),
	API_PORT: parseInt(process.env.API_PORT || '8080', 10),
	MAILGUN_API_KEY: process.env.MAILGUN_API_KEY || '',
	MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN || '',
	LOG_LEVEL: process.env.LOG_LEVEL || 'info',
	JWT_SECRET: process.env.JWT_SECRET || '',
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
	GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || '',
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
	GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || ''
}
