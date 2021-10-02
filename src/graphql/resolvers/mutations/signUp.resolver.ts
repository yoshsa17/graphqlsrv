import { UserInputError } from 'apollo-server-express'

import { Resolvers } from '../../generated/graphql.generated'
import { signUpRules } from '../../../lib/utils/validators/userValidator'
import { UserService } from '../../../services/User.service'

const signUpResolver: Resolvers = {
  Mutation: {
    signUp: async (
      _parent,
      { input: { username, email, password } },
      { container }
    ) => {
      // validation
      try {
        signUpRules.validate(
          { username, email, password },
          { abortEarly: false }
        )
      } catch (error: any) {
        throw new UserInputError(
          'Failed to create a user due to validation error',
          { validationErrors: error.errors }
        )
      }

      const service = container.get(UserService)

      // duplicate email & username
      const isNotDuplicated = await service.checkDuplication(email, username)
      if (isNotDuplicated) {
        throw new UserInputError(
          'Failed to create a user. Email or Username is already taken'
        )
      }

      // create user
      return service.create({ username, email, password })
    },
  },
}

export default signUpResolver
