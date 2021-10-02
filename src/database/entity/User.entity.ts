import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Like } from './Like.entity'
import { Post } from './Post.entity'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column('text', { unique: true })
  readonly username: string

  @Column('text', { unique: true })
  email: string

  @Column('text')
  password: string

  @Column('text', { default: '' })
  info: string

  @OneToMany(() => Post, (post) => post.owner)
  posts?: Post[]

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[]

  @CreateDateColumn()
  readonly created_at: Date

  @UpdateDateColumn()
  readonly updated_at: Date
}
