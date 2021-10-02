import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import session from 'express-session'
// import cors from 'cors'
import { Container } from 'typeorm-typedi-extensions'
import { useContainer } from 'typeorm'

import { IApolloServerCtx } from './lib/interfaces'
import { buildUsersLoader, buildPostsLoader } from './database/dataLoaders'
import rootSchema from './graphql/rootSchema'
import logger from './lib/utils/logger'
import { createTypeormConnection } from './database/createConnection'
import { redisClient, RedisStore } from './lib/redis'
import { COOKIE_NAME, ONE_YEAR_IN_MIL } from './lib/constants'
import { PORT, SESSION_COOKIE_SECRET, __prod__ } from './lib/config'

export const bootstrap = async (): Promise<void> => {
  useContainer(Container)

  await createTypeormConnection()

  const app = express()

  // app.use(
  //   cors({
  //     origin: 'http://localhost:3000',
  //     credentials: true,
  //   })
  // )

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: ONE_YEAR_IN_MIL,
        httpOnly: true,
        secure: __prod__,
        sameSite: 'lax',
      },
      saveUninitialized: false,
      secret: SESSION_COOKIE_SECRET,
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: rootSchema,
    context: ({ req, res }): IApolloServerCtx => ({
      req,
      res,
      container: Container,
      usersLoader: buildUsersLoader(),
      postsLoader: buildPostsLoader(),
    }),
    debug: !__prod__, // stack trace is omitted in GraphQL responses
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: {
          'request.credentials': 'include',
        },
      }),
    ],
  })

  await apolloServer.start()
  app.use(apolloServer.getMiddleware({}))

  app.listen(parseInt(PORT), () => {
    logger.info(`🚀 Server started on http://localhost:${PORT}`)
  })
}

bootstrap()
