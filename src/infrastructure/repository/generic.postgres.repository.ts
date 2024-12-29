import { Injectable, Logger } from '@nestjs/common'
import {
	Brackets,
	FindOptionsRelationByString,
	FindOptionsWhere,
	SelectQueryBuilder,
	Repository as TypeOrmRepository
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { PaginatedData } from '../../models/dtos'

type AtLeastOne<T> = {
	[K in keyof T]: Pick<T, K>
}[keyof T]

@Injectable()
export class GenericRepository<T extends { id: string }> {
	readonly logger = new Logger(GenericRepository.name)

	constructor(readonly repository: TypeOrmRepository<T>) {}

	createMany = async (entities: T[]): Promise<T[]> => {
		try {
			this.logger.verbose(
				`Attempting to create entities: ${entities.length || 0}`
			)
			const created = await this.repository.save(entities)
			this.logger.verbose(`Created entities: ${created.length}`)
			return created
		} catch (err) {
			this.logger.error('Error creating entities', err.stack)
			throw err
		}
	}

	get = async (where: AtLeastOne<T>): Promise<T[]> => {
		try {
			this.logger.verbose(
				`Attempting to get entities with conditions: ${JSON.stringify(where)}`
			)
			const result = await this.repository.find({
				where: { ...where } as FindOptionsWhere<T>
			})
			this.logger.verbose(`Found ${result.length} entities`)
			return result
		} catch (err) {
			this.logger.error('Error getting entities', err.stack)
			throw err
		}
	}

	getPaginatedByQueryBuilder = async (
		queryBuilder: SelectQueryBuilder<T>,
		options?: {
			page: number
			pageSize: number
			filter?: string
			filterBy?: (keyof T)[]
		}
	): Promise<PaginatedData<T>> => {
		try {
			const { page, pageSize, filter, filterBy } = options
			if (filter && filterBy.length) {
				const filterConditions = filterBy
					.map(
						(field) =>
							`LOWER(${queryBuilder.alias}.${field as string}) LIKE :filter`
					)
					.join(' OR ')

				queryBuilder.andWhere(`(${filterConditions})`, {
					filter: `%${filter.toLowerCase()}%`
				})
			}

			this.logger.verbose(`Executing paginated query with filter: ${filter}`)
			const total = await queryBuilder.getCount()
			queryBuilder.skip((page - 1) * pageSize).take(pageSize)
			const data = await queryBuilder.getMany()

			this.logger.verbose(`Found ${data.length} entities, total: ${total}`)
			return { data, total, page, pageSize }
		} catch (err) {
			this.logger.error('Error getting paginated entities', err.stack)
			throw err
		}
	}

	getPaginated = async (
		where: AtLeastOne<T> | object,
		options?: {
			page: number
			pageSize: number
			filter?: string
			filterBy?: (keyof T)[]
		}
	): Promise<PaginatedData<T>> => {
		try {
			const { page = 1, pageSize = 10, filter, filterBy } = options
			const offset = (page - 1) * pageSize
			let query = this.repository
				.createQueryBuilder('entity')
				.skip(offset)
				.take(pageSize)

			Object.keys(where).forEach((key) => {
				query = query.andWhere(`entity.${key} = :${key}`, { [key]: where[key] })
			})

			if (filter && filterBy && filterBy.length > 0) {
				query = query.andWhere(
					new Brackets((qb) => {
						filterBy.forEach((field) => {
							qb.orWhere(`entity.${field as string} ILIKE :filterText`, {
								filterText: `%${filter}%`
							})
						})
					})
				)
			}

			this.logger.verbose(`Executing paginated query with filter: ${filter}`)
			const data = await query.getMany()
			let countQuery = this.repository.createQueryBuilder('entity')

			Object.keys(where).forEach((key) => {
				countQuery = countQuery.andWhere(`entity.${key} = :${key}`, {
					[key]: where[key]
				})
			})

			if (filter && filterBy && filterBy.length > 0) {
				countQuery = countQuery.andWhere(
					new Brackets((qb) => {
						filterBy.forEach((field) => {
							qb.orWhere(`entity.${field as string} ILIKE :filterText`, {
								filterText: `%${filter}%`
							})
						})
					})
				)
			}

			const total = await countQuery.getCount()
			this.logger.verbose(`Found ${data.length} entities, total: ${total}`)
			return { total, data, page, pageSize }
		} catch (err) {
			this.logger.error('Error getting paginated entities', err.stack)
			throw err
		}
	}

	getById = async (
		id: string,
		relations?: (keyof T)[]
	): Promise<T | undefined> => {
		try {
			this.logger.verbose(`Attempting to get entity by id: ${id}`)
			const result = await this.repository.findOne({
				where: { id: id } as FindOptionsWhere<T>,
				relations: relations as FindOptionsRelationByString
			})
			if (result) {
				this.logger.verbose(`Found entity: ${JSON.stringify(result)}`)
			} else {
				this.logger.warn(`Entity with id ${id} not found`)
			}
			return result
		} catch (err) {
			this.logger.error('Error getting entity by id', err.stack)
			throw err
		}
	}

	getAll = async (): Promise<T[]> => {
		try {
			this.logger.verbose('Attempting to get all entities')
			const result = await this.repository.find()
			this.logger.verbose(`Found ${result.length} entities`)
			return result
		} catch (err) {
			this.logger.error('Error getting all entities', err.stack)
			throw err
		}
	}

	create = async (entity: T): Promise<T> => {
		try {
			this.logger.verbose(
				`Attempting to create entity: ${JSON.stringify(entity)}`
			)
			const created = await this.repository.save(entity)
			this.logger.verbose(`Created entity: ${JSON.stringify(created)}`)
			return await this.getById(created.id)
		} catch (err) {
			this.logger.error('Error creating entity', err.stack)
			throw err
		}
	}

	delete = async (id: string): Promise<void> => {
		try {
			this.logger.verbose(`Attempting to delete entity by id: ${id}`)
			await this.repository.delete(id)
			this.logger.verbose(`Entity with id ${id} deleted`)
		} catch (err) {
			this.logger.error('Error deleting entity', err.stack)
			throw err
		}
	}

	update = async (entity: T): Promise<T> => {
		try {
			this.logger.verbose(
				`Attempting to update entity: ${JSON.stringify(entity)}`
			)
			await this.repository.update(
				{ id: entity.id } as FindOptionsWhere<T>,
				entity as QueryDeepPartialEntity<T>
			)
			const updatedEntity = await this.getById(entity.id)
			this.logger.verbose(`Updated entity: ${JSON.stringify(updatedEntity)}`)
			return updatedEntity
		} catch (err) {
			this.logger.error('Error updating entity', err.stack)
			throw err
		}
	}

	updateMany = async (entities: T[]): Promise<void> => {
		try {
			this.logger.verbose(`Attempting to update entities: ${entities.length}`)

			for (const entity of entities) {
				await this.repository.update(
					{ id: entity.id } as FindOptionsWhere<T>,
					entity as QueryDeepPartialEntity<T>
				)
			}

			this.logger.verbose(`Updateded entities`)
		} catch (err) {
			this.logger.error('Error updating entity', err.stack)
			throw err
		}
	}
}
