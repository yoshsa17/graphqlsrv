import { Resolvers } from 'src/graphql/generated/graphql.generated'

const helloResolvers: Resolvers = {
  Query: {
    hello: (_root, _args, _context) => {
      return 'Hello world!'
    },
  },
}

export default helloResolvers
