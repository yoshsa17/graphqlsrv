import { Resolvers } from '../../../graphql/generated/graphql.generated'
import { User } from '../../../database/entity'

const userFieldResolver: Resolvers = {
  User: {
    posts: async (parent, _arg, { postsLoader }) => {
      return await postsLoader.load(parent.id)
    },
    email: (parent: User, _arg, { req }) => {
      if (req.session.userId == parent.id) {
        return parent.email
      }
      return ''
    },
  },
}

export default userFieldResolver
