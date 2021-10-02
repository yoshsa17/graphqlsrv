import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Post } from '../database/entity'

@Service()
export class PostService {
  @InjectRepository(Post)
  private repository: Repository<Post>

  findAll(take?: number, skip?: number): Promise<Post[]> {
    return this.repository.find({ order: { created_at: 'DESC' }, take, skip })
  }

  findOne(attributes: Partial<Post>): Promise<Post | undefined> {
    return this.repository.findOne({ where: attributes })
  }

  findMany(attributes: Partial<Post>): Promise<Post[]> {
    return this.repository.find({ where: attributes })
  }

  create(post: Partial<Post>, userId: number): Promise<Post> {
    return this.repository.save(
      this.repository.create({
        ...post,
        owner_id: userId,
      })
    )
  }

  async update(
    postId: number,
    userId: number,
    { title, text }: Partial<Post>
  ): Promise<boolean> {
    const result = await this.repository.update(
      { id: postId, owner_id: userId },
      { title, text }
    )

    // TODO:: refactor this line to return updated post
    if (result.affected) {
      return true
    }
    return false
  }

  async delete(postId: number, userId: number): Promise<boolean> {
    const result = await this.repository.delete({
      id: postId,
      owner_id: userId,
    })

    if (result.affected) {
      return true
    }
    return false
  }
}
