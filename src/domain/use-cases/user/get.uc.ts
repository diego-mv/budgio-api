import { Inject, Injectable } from '@nestjs/common'
import { EmailTemplatesService } from '../../../infrastructure/emails/emailTemplates.service'
import { IUserRepository } from '../../interfaces/repositories/user.repository'
import { Mappers } from '../../mappers'
import { IUserUseCase } from '../../../api/interfaces'

@Injectable()
export class GetUserUseCase implements IUserUseCase.IGetUserUseCase {
	constructor(
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository,
		@Inject('EmailService')
		private readonly emailTemplateService: EmailTemplatesService
	) {}

	execute = async (userId: string) => {
		const user = await this.userRepository.getById(userId)

		return Mappers.User.entityToDto(user)
	}
}
