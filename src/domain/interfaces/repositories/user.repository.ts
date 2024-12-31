import { Entities } from '../../../models'
import { IGenericRepository } from './generic.repository'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserRepository extends IGenericRepository<Entities.IUser> {
	getByEmail: (email: string) => Promise<Entities.IUser | null>
}
