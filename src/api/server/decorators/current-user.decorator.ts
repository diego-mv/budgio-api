// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Dto } from '../../../models'

export const User = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		return request.user as Dto.User.UserDto
	}
)
