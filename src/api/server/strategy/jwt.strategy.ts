// jwt.strategy.ts
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { CONSTANTS } from '../../../constants'
import { Dto } from '../../../models'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			secretOrKey: CONSTANTS.ENV.JWT_SECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		})
	}

	async validate(payload: Dto.User.UserDto) {
		return {
			id: payload.id,
			username: payload.name,
			email: payload.email
		}
	}
}
