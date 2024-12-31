import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm'
import { IUser } from '../../models/entities/user.entity'

@Entity('User')
export class User implements IUser {
	@PrimaryColumn({ name: 'Id', length: 64 })
	id: string

	@Column({ name: 'Name', length: 128 })
	name: string

	@Column({ name: 'Email', length: 128 })
	email: string

	@Column({ name: 'PasswordHash' })
	passwordHash?: string

	@CreateDateColumn({ name: 'CreatedAt', type: 'timestamptz' })
	createdAt: Date

	@UpdateDateColumn({ name: 'UpdatedAt', type: 'timestamptz', nullable: true })
	updatedAt: Date | null
}
