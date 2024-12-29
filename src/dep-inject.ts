import { SingletonConnection } from './infrastructure/db/postgress.db'
import { EmailMailgunService } from './infrastructure/emails/emailMailgun.service'
import { EmailTemplatesService } from './infrastructure/emails/emailTemplates.service'
import { CheckingAccountPostgresRepository } from './infrastructure/repository/checking-account.postgres.repository'
import { CreditCardPostgresRepository } from './infrastructure/repository/credit-card.postgres.repository'
import { ExpenseCreditCardPostgresRepository } from './infrastructure/repository/expense-credit-card.postgres.repository'
import { ExpensePostgresRepository } from './infrastructure/repository/expense.postgres.repository'
import { UserPostgresRepository } from './infrastructure/repository/user.postgres.repository'
import { Entities } from './models'

//Connection DB
const connection = SingletonConnection.getConnection()

///Repositories
const userPostgresRepository = new UserPostgresRepository(
	connection.getRepository(Entities.User)
)
const creditCardPostgresRepository = new CreditCardPostgresRepository(
	connection.getRepository(Entities.CreditCard)
)
const checkingAccountPostgressRepository =
	new CheckingAccountPostgresRepository(
		connection.getRepository(Entities.CheckingAccount)
	)
const expensePostgresRepository = new ExpensePostgresRepository(
	connection.getRepository(Entities.Expense)
)
const expenseCreditCardPostgresRepository =
	new ExpenseCreditCardPostgresRepository(
		connection.getRepository(Entities.ExpenseCreditCard)
	)

//Services
const emailMailgunService = new EmailMailgunService()
const emailTemplatesService = new EmailTemplatesService(emailMailgunService)

export const DepInject = {
	Repositories: {
		userPostgresRepository,
		creditCardPostgresRepository,
		expenseCreditCardPostgresRepository,
		checkingAccountPostgressRepository,
		expensePostgresRepository
	},
	Services: {
		emailTemplatesService,
		emailMailgunService
	}
}
