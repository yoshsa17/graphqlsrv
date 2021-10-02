import { AuthenticationError } from 'apollo-server-express'

import { Resolvers } from '../../../graphql/generated/graphql.generated'
import { PostService } from '../../../services/Post.service'

const deletePostResolver: Resolvers = {
  Mutation: {
    deletePost: async (_parent, { id }, { req, container }) => {
      if (!req.session.userId) {
        throw new AuthenticationError('not authenticated')
      }

      return await container.get(PostService).delete(id, req.session.userId)
    },
  },
}

export default deletePostResolver
