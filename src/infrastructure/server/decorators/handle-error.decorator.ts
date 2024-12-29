export function HandleErrors() {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const originalMethod = descriptor.value

		descriptor.value = async function (...args: any[]) {
			try {
				return await originalMethod.apply(this, args)
			} catch (error) {
				throw error
			}
		}

		return descriptor
	}
}
