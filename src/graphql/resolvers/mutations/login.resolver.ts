import { UserInputError } from 'apollo-server-express'

import { Resolvers } from '../../generated/graphql.generated'
import { loginRules } from '../../../lib/utils/validators/userValidator'
import { AuthenticationService } from '../../../services/Authentication.service'

const loginResolver: Resolvers = {
  Mutation: {
    login: async (
      _parent,
      { input: { email, password } },
      { req, container }
    ) => {
      // validation
      try {
        await loginRules.validate({ email, password }, { abortEarly: false })
      } catch (e: any) {
        throw new UserInputError(
          'Failed to authenticate a user due to validation error',
          { validationErrors: e.errors }
        )
      }

      // verification
      const user = await container
        .get(AuthenticationService)
        .verifyUser(email, password)

      // set a cookie on the user
      req.session.userId = user.id

      return user
    },
  },
}

export default loginResolver
