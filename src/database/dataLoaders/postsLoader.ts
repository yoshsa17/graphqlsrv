import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { Post } from '../entity'
import { groupBy } from 'ramda'

const batchLoadPosts: DataLoader.BatchLoadFn<number, Post[]> = async (
  postsIds
) => {
  const posts = await getRepository(Post).findByIds(postsIds as number[])

  const groupByOwnerId = groupBy((post) => post.owner_id, posts)

  return postsIds.map((postsId) => groupByOwnerId[postsId] || null)
}

export const buildPostsLoader = () =>
  new DataLoader<number, Post[]>(batchLoadPosts)
