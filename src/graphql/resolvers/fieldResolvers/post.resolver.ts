import { Resolvers } from '../../../graphql/generated/graphql.generated'

const postFieldResolver: Resolvers = {
  Post: {
    owner: async (parent, _arg, { usersLoader }) => {
      return usersLoader.load(parent.owner_id)
    },
  },
}

export default postFieldResolver
