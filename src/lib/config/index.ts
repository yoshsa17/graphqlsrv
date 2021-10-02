export enum Environment {
  production = 'production',
  development = 'development',
  test = 'test',
}

export const ENVIRONMENT = process.env.NODE_ENV || Environment.development
export const __prod__ = ENVIRONMENT === Environment.production

export const PORT = process.env.NODE_PORT || '8000'

export const SESSION_COOKIE_SECRET =
  process.env.SESSION_COOKIE_SECRET || 'dummy secret key'

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
export const REDIS_PORT = process.env.REDIS_PORT || '6379'
export const REDIS_PASSWORD = process.env.PASSWORD || 'redis'
