import { Service } from 'typedi'
import { Connection, Repository } from 'typeorm'
import { InjectConnection, InjectRepository } from 'typeorm-typedi-extensions'

import { Like } from '../database/entity'

@Service()
export class LikeService {
  @InjectRepository(Like)
  private repository: Repository<Like>

  @InjectConnection()
  private connection: Connection

  findAll(): Promise<Like[]> {
    return this.repository.find({})
  }

  findByIds(postId: number, userId: number): Promise<Like | undefined> {
    return this.repository.findOne({
      where: { user_id: userId, post_id: postId },
    })
  }

  async createLike(
    postId: number,
    userId: number,
    value: number
  ): Promise<boolean> {
    await this.connection.transaction(async (tm) => {
      // update a points field on the post
      await tm.query(
        `
        UPDATE "post"
        SET points = points + $1
        WHERE "id" = $2
        `,
        [value, postId]
      )

      // create a new Like record
      await tm.query(
        `
        INSERT INTO "like" ("user_id","post_id","value")
        VALUES ($1,$2,$3)
        `,
        [userId, postId, value]
      )
    })

    return true
  }

  async updateLike(
    postId: number,
    userId: number,
    newValue: number
  ): Promise<boolean> {
    await this.connection.transaction(async (tm) => {
      // update a points field with newValue
      await tm.query(
        `
      UPDATE "post"
      SET points = points + $1 * 2
      WHERE "id" = $2
      `,
        [newValue, postId]
      )

      // update a value field
      await tm.query(
        `
      UPDATE "like"
      SET value = $1
      WHERE post_id = $2 AND user_id = $3
      `,
        [newValue, postId, userId]
      )
    })

    return true
  }
}
