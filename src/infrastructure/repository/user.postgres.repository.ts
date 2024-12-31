import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository'
import { GenericRepository } from './generic.postgres.repository'
import { User } from '../entities'

@Injectable()
export class UserPostgresRepository
	extends GenericRepository<User>
	implements IUserRepository
{
	constructor(repository: Repository<User>) {
		super(repository)
	}

	getByEmail = async (email: string): Promise<User | null> => {
		return this.repository.findOne({ where: { email } })
	}
}
