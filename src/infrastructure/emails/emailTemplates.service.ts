import { Injectable } from '@nestjs/common'
import { IEmailTemplatesService } from '../../domain/interfaces/services/emailTemplates.service'
import { IEmailService } from '../../domain/interfaces/services/email.service'

@Injectable()
export class EmailTemplatesService implements IEmailTemplatesService {
	constructor(private readonly emailService: IEmailService) {}

	sendWelcomeEmail(to: string): Promise<void> {
		throw new Error(`Method not implemented ${to}.`)
	}
	sendPasswordResetEmail(to: string): Promise<void> {
		throw new Error(`Method not implemented ${to}.`)
	}
}
