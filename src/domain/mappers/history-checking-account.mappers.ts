import { Dto, Entities } from '../../models'

export const HistoryCheckingAccount = {
	entityToDto: (
		entity: Entities.IHistorytCheckingAccount
	): Dto.HistoryCheckingAccount.HistoryCheckingAccountDto => {
		return {
			id: entity.id,
			checkingAccountId: entity.checkingAccountId,
			balance: entity.balance,
			date: entity.date,
			description: entity.description
		}
	},
	entitiesToDto: (
		entities: Entities.IHistorytCheckingAccount[]
	): Dto.HistoryCheckingAccount.HistoryCheckingAccountDto[] => {
		return entities.map((entity) => HistoryCheckingAccount.entityToDto(entity))
	}
}
