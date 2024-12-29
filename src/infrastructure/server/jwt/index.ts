import * as jwt from 'jsonwebtoken'
import { CONSTANTS } from '../../../constants'
import { WinstonLogger } from '../../logger/winston.logger'
import { Dto } from '../../../models'

const logger = new WinstonLogger()

export const generateJwtToken = (user: Dto.User.UserDto): string => {
	const payload = { ...user }
	return jwt.sign(payload, CONSTANTS.ENV.JWT_SECRET, { expiresIn: '365d' })
}

export const generateRefreshToken = (user: Dto.User.UserDto): string => {
	return jwt.sign(
		{
			sub: user.id
		},
		CONSTANTS.ENV.JWT_SECRET,
		{ expiresIn: '7d' }
	)
}

export const verifyJwtToken = (token: string): jwt.JwtPayload | string => {
	try {
		const decoded = jwt.verify(token, CONSTANTS.ENV.JWT_SECRET)
		return decoded
	} catch (error) {
		logger.error('Invalid or expired Access Token', error)
		throw new Error('Invalid or expired Access Token')
	}
}

export function verifyRefreshToken(token: string): any {
	try {
		const decoded = jwt.verify(token, CONSTANTS.ENV.JWT_SECRET)
		return decoded
	} catch (error) {
		logger.error('Invalid or expired Refresh Token', error)
		throw new Error('Invalid or expired Refresh Token')
	}
}
