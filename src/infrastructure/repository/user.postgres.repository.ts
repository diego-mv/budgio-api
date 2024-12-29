import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository'
import { GenericRepository } from './generic.postgres.repository'
import { Entities } from '../../models'

@Injectable()
export class UserPostgresRepository
	extends GenericRepository<Entities.User>
	implements IUserRepository
{
	constructor(repository: Repository<Entities.User>) {
		super(repository)
	}

	getByEmail = async (email: string): Promise<Entities.User | null> => {
		return this.repository.findOne({ where: { email } })
	}
}
