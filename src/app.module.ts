import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './api/auth/auth.module'
import { CheckingAccountModule } from './api/checking-account/checking-account.module'
import { CreditCardModule } from './api/credit-card/credit-card.module'
import { ExpenseModule } from './api/expense/expense.module'
import { UserModule } from './api/user/user.module'
import { WinstonLogger } from './infrastructure/logger/winston.logger'
import { JwtAuthGuard } from './infrastructure/server/guards/jwt-auth.guard'
import { JwtStrategy } from './infrastructure/server/strategy/jwt.strategy'
import { ExpenseCreditCardModule } from './api/expense-credit-card/expense-credit-card.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CheckingAccountModule,
		CreditCardModule,
		ExpenseCreditCardModule,
		ExpenseModule,
		UserModule,
		AuthModule
	],
	controllers: [],
	providers: [
		JwtStrategy,
		JwtAuthGuard,
		{
			provide: 'LoggerService',
			useClass: WinstonLogger
		}
	]
})
export class AppModule {}
