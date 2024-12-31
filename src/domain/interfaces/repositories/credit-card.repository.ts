import { Entities } from '../../../models'
import { IGenericRepository } from './generic.repository'

export interface ICreditCardRepository
	extends IGenericRepository<Entities.ICreditCard> {
	getByUser: (userId: string) => Promise<Entities.ICreditCard[]>
}
