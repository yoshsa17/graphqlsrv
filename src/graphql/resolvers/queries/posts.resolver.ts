import { Resolvers } from '../../generated/graphql.generated'
import { PostService } from '../../../services/Post.service'

const postsResolver: Resolvers = {
  Query: {
    posts: async (_parent, { limit, offset }, { container }) => {
      const realLimit = Math.min(50, limit)
      const realOffset = Math.min(50, offset)

      const posts = await container
        .get(PostService)
        .findAll(realLimit + 1, realOffset)

      const hasPrevious = realOffset !== 0
      const hasNext = posts.length === realLimit + 1

      return { posts: posts.slice(0, realLimit), hasPrevious, hasNext }
    },
  },
}

export default postsResolver
