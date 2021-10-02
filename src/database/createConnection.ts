import { ENVIRONMENT } from '../lib/config'
import { getConnectionOptions, createConnection, Connection } from 'typeorm'

export const createTypeormConnection = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions(ENVIRONMENT)
  return createConnection({ ...connectionOptions, name: 'default' })
}
