import { AuthenticationError, UserInputError } from 'apollo-server-express'

import { postRules } from '../../../lib/utils/validators/postValidator'
import { Resolvers } from '../../../graphql/generated/graphql.generated'
import { PostService } from '../../../services/Post.service'

const createPostResolver: Resolvers = {
  Mutation: {
    createPost: (_parent, { input }, { req, container }) => {
      if (!req.session.userId) {
        throw new AuthenticationError('not authenticated')
      }

      // validation
      try {
        postRules.validate(input, { abortEarly: false })
      } catch (error: any) {
        throw new UserInputError(
          'Failed to create a post due to validation error',
          { validationErrors: error.errors }
        )
      }

      return container.get(PostService).create(input, req.session.userId)
    },
  },
}

export default createPostResolver
