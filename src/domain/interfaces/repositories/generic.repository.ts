type AtLeastOne<T> = {
	[K in keyof T]: Pick<T, K>
}[keyof T]

export interface IGenericRepository<T> {
	get(where: AtLeastOne<T>): Promise<T[]>
	getAll(): Promise<T[]>
	getById(id: string, relations?: (keyof T)[]): Promise<T | null>
	create(entity: T): Promise<T>
	createMany(entities: T[]): Promise<T[]>
	delete(id: string): Promise<void>
	update(entity: T): Promise<T>
	updateMany(entities: T[]): Promise<void>
}
