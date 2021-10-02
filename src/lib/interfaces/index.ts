import { Request, Response } from 'express'
import { Container } from 'typeorm-typedi-extensions'
import { buildPostsLoader, buildUsersLoader } from '../../database/dataLoaders'

export interface IApolloServerCtx {
  req: Request & { session: Express.Session }
  res: Response
  container: typeof Container
  usersLoader: ReturnType<typeof buildUsersLoader>
  postsLoader: ReturnType<typeof buildPostsLoader>
}
