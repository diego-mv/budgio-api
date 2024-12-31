import { CallbackUseCase } from './domain/use-cases/auth/callback.uc'
import { RefreshTokenUseCase } from './domain/use-cases/auth/refresh-token.uc'
import { CreateCheckingAccountUseCase } from './domain/use-cases/checking-account/create.uc'
import { DeleteCheckingAccountUseCase } from './domain/use-cases/checking-account/delete.uc'
import { GetCheckingAccountByUserUseCase } from './domain/use-cases/checking-account/get-by-user.uc'
import { UpdateCheckingAccountUseCase } from './domain/use-cases/checking-account/update.uc'
import { CreateCreditCardUseCase } from './domain/use-cases/credit-card/create.uc'
import { DeleteCreditCardUseCase } from './domain/use-cases/credit-card/delete.uc'
import { GetCreditCardByUserUseCase } from './domain/use-cases/credit-card/get-by-user.uc'
import { UpdateCreditCardUseCase } from './domain/use-cases/credit-card/update.uc'
import { CreateExpenseUseCase } from './domain/use-cases/expense/create.uc'
import { DeleteExpenseUseCase } from './domain/use-cases/expense/delete.uc'
import { GetByUserExpenseUseCase } from './domain/use-cases/expense/get-by-user.uc'
import { UpdateExpenseUseCase } from './domain/use-cases/expense/update.uc'
import { CreateExpenseCreditCardUseCase } from './domain/use-cases/exponse-credit-card/create.uc'
import { DeleteExpenseCreditCardUseCase } from './domain/use-cases/exponse-credit-card/delete.uc'
import { GetByCreditCardExpenseCreditCardUseCase } from './domain/use-cases/exponse-credit-card/get-by-credit-card.uc'
import { ImportExpensesCreditCardUseCase } from './domain/use-cases/exponse-credit-card/import-expenses-credit-card.uc'
import { UpdateExpenseCreditCardUseCase } from './domain/use-cases/exponse-credit-card/update.uc'
import { CreateUserUseCase } from './domain/use-cases/user/create.uc'
import { GetUserByEmailUseCase } from './domain/use-cases/user/get-by-email.uc'
import { GetUserUseCase } from './domain/use-cases/user/get.uc'
import { SingletonConnection } from './infrastructure/db/postgress.db'
import { EmailMailgunService } from './infrastructure/emails/emailMailgun.service'
import { EmailTemplatesService } from './infrastructure/emails/emailTemplates.service'
import {
	CreditCard,
	User,
	CheckingAccount,
	Expense,
	ExpenseCreditCard
} from './infrastructure/entities'
import { CheckingAccountPostgresRepository } from './infrastructure/repository/checking-account.postgres.repository'
import { CreditCardPostgresRepository } from './infrastructure/repository/credit-card.postgres.repository'
import { ExpenseCreditCardPostgresRepository } from './infrastructure/repository/expense-credit-card.postgres.repository'
import { ExpensePostgresRepository } from './infrastructure/repository/expense.postgres.repository'
import { UserPostgresRepository } from './infrastructure/repository/user.postgres.repository'

//Connection DB
const connection = SingletonConnection.getConnection()

export const IoC = {
	// Repositories
	Repositories: {
		userRepository: () =>
			new UserPostgresRepository(connection.getRepository(User)),
		creditCardRepository: () =>
			new CreditCardPostgresRepository(connection.getRepository(CreditCard)),
		checkingAccountRepository: () =>
			new CheckingAccountPostgresRepository(
				connection.getRepository(CheckingAccount)
			),
		expenseRepository: () =>
			new ExpensePostgresRepository(connection.getRepository(Expense)),
		expenseCreditCardRepository: () =>
			new ExpenseCreditCardPostgresRepository(
				connection.getRepository(ExpenseCreditCard)
			)
	},

	// Services
	Services: {
		emailMailgunService: () => new EmailMailgunService(),
		emailTemplatesService: () =>
			new EmailTemplatesService(IoC.Services.emailMailgunService())
	},

	// Use cases
	UseCases: {
		Auth: {
			callBackUseCase: () => new CallbackUseCase(),
			refreshTokenUseCase: () =>
				new RefreshTokenUseCase(IoC.Repositories.userRepository())
		},
		User: {
			createUserUseCase: () =>
				new CreateUserUseCase(IoC.Repositories.userRepository()),
			getUserUseCase: () =>
				new GetUserUseCase(
					IoC.Repositories.userRepository(),
					IoC.Services.emailTemplatesService()
				),
			getUserByEmailUseCase: () =>
				new GetUserByEmailUseCase(IoC.Repositories.userRepository())
		},
		CreditCard: {
			createCreditCardUseCase: () =>
				new CreateCreditCardUseCase(IoC.Repositories.creditCardRepository()),
			deleteCreditCardUseCase: () =>
				new DeleteCreditCardUseCase(IoC.Repositories.creditCardRepository()),
			updateCreditCardUseCase: () =>
				new UpdateCreditCardUseCase(IoC.Repositories.creditCardRepository()),
			getCreditCardByUserUseCase: () =>
				new GetCreditCardByUserUseCase(IoC.Repositories.creditCardRepository())
		},
		CheckingAccount: {
			createCheckingAccountUseCase: () =>
				new CreateCheckingAccountUseCase(
					IoC.Repositories.checkingAccountRepository()
				),
			deleteCheckingAccountUseCase: () =>
				new DeleteCheckingAccountUseCase(
					IoC.Repositories.checkingAccountRepository()
				),
			updateCheckingAccountUseCase: () =>
				new UpdateCheckingAccountUseCase(
					IoC.Repositories.checkingAccountRepository()
				),
			getCheckingAccountByUserUseCase: () =>
				new GetCheckingAccountByUserUseCase(
					IoC.Repositories.checkingAccountRepository()
				)
		},
		Expense: {
			createExpenseUseCase: () =>
				new CreateExpenseUseCase(IoC.Repositories.expenseRepository()),
			updateExpenseUseCase: () =>
				new UpdateExpenseUseCase(IoC.Repositories.expenseRepository()),
			deleteExpenseUseCase: () =>
				new DeleteExpenseUseCase(IoC.Repositories.expenseRepository()),
			getExpenseByUserUseCase: () =>
				new GetByUserExpenseUseCase(IoC.Repositories.expenseRepository())
		},
		ExpenseCreditCard: {
			createExpenseCreditCardUseCase: () =>
				new CreateExpenseCreditCardUseCase(
					IoC.Repositories.creditCardRepository(),
					IoC.Repositories.expenseCreditCardRepository()
				),
			updateExpenseCreditCardUseCase: () =>
				new UpdateExpenseCreditCardUseCase(
					IoC.Repositories.expenseCreditCardRepository()
				),
			deleteExpenseCreditCardUseCase: () =>
				new DeleteExpenseCreditCardUseCase(
					IoC.Repositories.expenseCreditCardRepository()
				),
			getByCreditCardExpenseCreditCardUseCase: () =>
				new GetByCreditCardExpenseCreditCardUseCase(
					IoC.Repositories.expenseCreditCardRepository()
				),
			importExpensesCreditCardUseCase: () =>
				new ImportExpensesCreditCardUseCase(
					IoC.Repositories.creditCardRepository(),
					IoC.Repositories.expenseCreditCardRepository()
				)
		}
	}
}
