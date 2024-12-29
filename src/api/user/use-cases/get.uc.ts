import { Inject, Injectable } from '@nestjs/common'
import { IUserRepository } from '../../../domain/interfaces/repositories/user.repository'
import { EmailMailgunService } from '../../../infrastructure/emails/emailMailgun.service'
import { Mappers } from '../../../mappers'

@Injectable()
export class GetUserUseCase {
	constructor(
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository,
		@Inject('EmailService')
		private readonly emailService: EmailMailgunService
	) {}

	execute = async (userId: string) => {
		const user = await this.userRepository.getById(userId)
		this.emailService.sendEmail(
			'diegomoralesval@gmail.com',
			'Prueba de mailgun',
			'<h1>¡Hola! Gracias por registrarte en nuestra aplicación.</h1>'
		)
		return Mappers.User.entityToDto(user)
	}
}
