import { Injectable } from '@nestjs/common'
import * as formData from 'form-data'
import Mailgun from 'mailgun.js'
import { WinstonLogger } from '../logger/winston.logger'
import { IEmailService } from '../../domain/interfaces/services/email.service'
import { CONSTANTS } from '../../constants'

@Injectable()
export class EmailMailgunService implements IEmailService {
	private readonly logger = new WinstonLogger()

	async sendEmail(to: string, subject: string, html: string): Promise<void> {
		try {
			const mailgun = new Mailgun(formData)
			const mg = mailgun.client({
				username: 'api',
				key: CONSTANTS.ENV.MAILGUN_API_KEY || 'key-yourkeyhere'
			})

			await mg.messages.create(CONSTANTS.ENV.MAILGUN_DOMAIN, {
				from: `Excited User <mailgun@${CONSTANTS.ENV.MAILGUN_DOMAIN}>`,
				subject: subject,
				html: html,
				to: to
			})

			this.logger.log('Email sent successfully')
		} catch (error) {
			this.logger.error('Error sending email', error)
			throw error
		}
	}
}
