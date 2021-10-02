import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { LikeService } from '../../../services/Like.service'
import { PostService } from '../../../services/Post.service'
import { Resolvers } from '../../generated/graphql.generated'

const voteResolver: Resolvers = {
  Mutation: {
    vote: async (_parent, { postId, value }, { req, container }) => {
      if (!req.session.userId) {
        throw new AuthenticationError('not authenticated')
      }

      const postService = await container.get(PostService)
      const likeService = await container.get(LikeService)

      // validate postId
      const post = await postService.findOne({ id: postId })
      if (!post) {
        throw new UserInputError('post not found')
      }

      const realValue = value >= 0 ? 1 : -1

      const like = await likeService.findByIds(postId, req.session.userId)

      if (like && like.value !== realValue) {
        // if the user has voted on this post before and wants to update
        return likeService.updateLike(postId, req.session.userId, realValue)
      } else if (!like) {
        // if the user votes on this post for first time
        return likeService.createLike(postId, req.session.userId, realValue)
      }
      return false
    },
  },
}

export default voteResolver
