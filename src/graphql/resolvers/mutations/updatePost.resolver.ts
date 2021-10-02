import { AuthenticationError, UserInputError } from 'apollo-server-express'

import { postRules } from '../../../lib/utils/validators/postValidator'
import { Resolvers } from '../../../graphql/generated/graphql.generated'
import { PostService } from '../../../services/Post.service'

const updatePostResolver: Resolvers = {
  Mutation: {
    updatePost: async (
      _parent,
      { input: { id, title, text } },
      { req, container }
    ) => {
      if (!req.session.userId) {
        throw new AuthenticationError('not authenticated')
      }

      // validation
      try {
        postRules.validate({ title, text }, { abortEarly: false })
      } catch (error: any) {
        throw new UserInputError(
          'Failed to update a post due to validation error',
          { validationErrors: error.errors }
        )
      }

      return await container
        .get(PostService)
        .update(id, req.session.userId, { title, text })
    },
  },
}

export default updatePostResolver
