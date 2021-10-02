import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from './config'

export const RedisStore = connectRedis(session)

export const redisClient = new Redis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT),
  password: REDIS_PASSWORD,
})
