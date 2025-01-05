import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './api/auth/auth.module'
import { CheckingAccountModule } from './api/checking-account/checking-account.module'
import { CreditCardModule } from './api/credit-card/credit-card.module'
import { ExpenseCreditCardModule } from './api/expense-credit-card/expense-credit-card.module'
import { ExpenseModule } from './api/expense/expense.module'
import { UserModule } from './api/user/user.module'
import { WinstonLogger } from './infrastructure/logger/winston.logger'
import { HistoryCheckingAccountModule } from './api/history-checking-account/history-checking-account.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CheckingAccountModule,
		CreditCardModule,
		ExpenseCreditCardModule,
		ExpenseModule,
		UserModule,
		AuthModule,
		HistoryCheckingAccountModule
	],
	controllers: [],
	providers: [
		{
			provide: 'LoggerService',
			useClass: WinstonLogger
		}
	]
})
export class AppModule {}
