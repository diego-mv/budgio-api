import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { Guards } from '../server/guards'
import { UserService } from './user.service'

@UseGuards(Guards.JwtAuthGuard)
@ApiSecurity('bearer')
@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	@ApiParam({ name: 'id', type: 'string' })
	async getUser(id: string) {
		return this.userService.getUserById(id)
	}
}
