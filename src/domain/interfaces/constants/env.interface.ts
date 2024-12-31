export interface IEnvConfig {
	DATABASE_HOST: string
	DATABASE_PORT: number
	DATABASE_USER: string
	DATABASE_PASSWORD: string
	DATABASE_NAME: string
	ENABLE_SWAGGER: boolean
	APP_PORT: number
	API_PORT: number
	MAILGUN_API_KEY: string
	MAILGUN_DOMAIN: string
	LOG_LEVEL: string
	JWT_SECRET: string
	GITHUB_CLIENT_ID: string
	GITHUB_CLIENT_SECRET: string
	GITHUB_CALLBACK_URL: string
	GOOGLE_CLIENT_ID: string
	GOOGLE_CLIENT_SECRET: string
	GOOGLE_CALLBACK_URL: string
}
