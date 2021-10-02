import { ForbiddenError } from 'apollo-server-express'

import { UserService } from '../../../services/User.service'
import { Resolvers } from '../../generated/graphql.generated'

const meResolver: Resolvers = {
  Query: {
    me: async (_parent, _arg, { req, container }) => {
      if (!req.session.userId) {
        throw new ForbiddenError('you are not logged in')
      }

      return (
        (await container.get(UserService).findOne(req.session.userId)) || null
      )
    },
  },
}

export default meResolver
