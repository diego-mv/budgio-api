import * as ExcelJS from 'exceljs'

export class ExcelHandler {
	static async readExcel<T>(
		buffer: Buffer,
		headers: { [key in keyof T]: string }
	): Promise<T[]> {
		const workbook = new ExcelJS.Workbook()
		await workbook.xlsx.load(buffer)
		const worksheet = workbook.getWorksheet(1)
		const data: T[] = []

		const headerMap: { [header: string]: number } = {}

		const firstRow = worksheet.getRow(1)
		firstRow.eachCell((cell, colNumber) => {
			headerMap[cell.text.trim()] = colNumber
		})

		worksheet.eachRow((row, rowNumber) => {
			if (rowNumber > 1) {
				const rowData: T = {} as T

				Object.keys(headers).forEach((key) => {
					const dtoProp: keyof T = key as keyof T
					const excelHeader = headers[dtoProp]

					const excelHeaderIndex = headerMap[excelHeader]

					if (excelHeaderIndex) {
						let value: string = row.getCell(excelHeaderIndex).text.trim()
						if (dtoProp === 'date') {
							value = new Date(value).toISOString()
						}
						rowData[dtoProp] = value as T[keyof T]
					}
				})

				data.push(rowData)
			}
		})

		return data
	}

	private static isDateType<T>(dtoProp: keyof T, rowData: T): boolean {
		const propType = typeof rowData[dtoProp]
		return propType === 'object' && rowData[dtoProp] instanceof Date
	}
}
