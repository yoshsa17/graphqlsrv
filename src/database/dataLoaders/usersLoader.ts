import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { User } from '../entity'

const batchLoadUsers: DataLoader.BatchLoadFn<number, User> = async (
  userIds
) => {
  const users = await getRepository(User).findByIds(userIds as number[])

  const lookup = users.reduce<Record<number, User>>(
    (acc, user) => ({
      ...acc,
      [user.id]: user,
    }),
    {}
  )

  return userIds.map((id) => lookup[id] || null)
}

export const buildUsersLoader = () =>
  new DataLoader<number, User>(batchLoadUsers)
