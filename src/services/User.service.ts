import { Service } from 'typedi'
import { Connection, Repository } from 'typeorm'
import { InjectConnection, InjectRepository } from 'typeorm-typedi-extensions'
import argon2 from 'argon2'

import { User } from '../database/entity'

@Service()
export class UserService {
  @InjectRepository(User)
  private repository: Repository<User>

  @InjectConnection()
  private connection: Connection

  findAll(): Promise<User[]> {
    return this.repository.find({ order: { created_at: 'ASC' } })
  }

  findOne(attributes: Partial<User>): Promise<User | undefined> {
    return this.repository.findOne(attributes)
  }

  async create(
    userAttributes: Partial<User> & { password: string }
  ): Promise<User> {
    const hashedPassword = await argon2.hash(userAttributes.password)

    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect() // performs connection

    try {
      await queryRunner.startTransaction()

      const user = queryRunner.manager.create(User, {
        ...userAttributes,
        password: hashedPassword,
      })
      await queryRunner.manager.save(user)

      await queryRunner.commitTransaction()

      return user
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async checkDuplication(email: string, username: string): Promise<boolean> {
    const user = await this.repository
      .createQueryBuilder()
      .where('email = :email OR username = :username', { email, username })
      .getOne()

    if (user) {
      return false
    }

    return true
  }
}
