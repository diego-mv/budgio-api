import { Entities } from '../../../models'
import { IGenericRepository } from './generic.repository'

export interface ICreditCardRepository
	extends IGenericRepository<Entities.CreditCard> {
	getByUser: (userId: string) => Promise<Entities.CreditCard[]>
}
