export interface IEmailTemplatesService {
	sendWelcomeEmail(to: string): Promise<void>
	sendPasswordResetEmail(to: string): Promise<void>
}
