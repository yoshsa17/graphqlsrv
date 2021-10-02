import { Resolvers } from '../../generated/graphql.generated'
import { PostService } from '../../../services/Post.service'

const postResolver: Resolvers = {
  Query: {
    post: async (_parent, { id }, { container }) => {
      return (await container.get(PostService).findOne({ id })) || null
    },
  },
}

export default postResolver
