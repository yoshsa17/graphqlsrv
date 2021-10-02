import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

import { makeExecutableSchema } from '@graphql-tools/schema'

const rootSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default rootSchema
