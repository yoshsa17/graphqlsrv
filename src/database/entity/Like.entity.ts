import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm'
import { Post } from '.'
import { User } from './User.entity'

@Entity('like')
export class Like {
  @PrimaryColumn('int')
  readonly user_id: number

  @ManyToOne(() => User, (user) => user.likes)
  readonly user: User

  @PrimaryColumn('int')
  readonly post_id: number

  @ManyToOne(() => Post, (post) => post.likes)
  readonly post: Post

  @Column('int')
  value: number
}
