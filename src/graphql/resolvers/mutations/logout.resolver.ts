import { COOKIE_NAME } from '../../../lib/constants'
import { Resolvers } from '../../generated/graphql.generated'

const logoutResolver: Resolvers = {
  Mutation: {
    logout: (_parent, _arg, { req, res }) => {
      return new Promise((resolve) =>
        req.session.destroy((err) => {
          res.clearCookie(COOKIE_NAME)
          if (err) {
            console.log(err)
            resolve(false)
          }
          resolve(true)
        })
      )
    },
  },
}

export default logoutResolver
