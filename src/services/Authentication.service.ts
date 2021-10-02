import { ForbiddenError } from 'apollo-server-express'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import argon2 from 'argon2'

import { User } from '../database/entity'

@Service()
export class AuthenticationService {
  @InjectRepository(User)
  private repository: Repository<User>

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    if (!user) {
      throw new ForbiddenError('user not found')
    }

    const isValid = await argon2.verify(user.password, password)
    if (!isValid) {
      throw new ForbiddenError('Invalid password')
    }

    return user
  }
}
