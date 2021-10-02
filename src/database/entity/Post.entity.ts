import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Like } from './Like.entity'
import { User } from './User.entity'

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column('text')
  title: string

  @Column('text')
  text: string

  @Column('int', { default: 0 })
  points: number

  @Column('int')
  readonly owner_id: number

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({
    name: 'owner_id',
  })
  readonly owner: User

  @OneToMany(() => Like, (favorite) => favorite.user)
  likes: Like[]

  @CreateDateColumn()
  readonly created_at: Date

  @UpdateDateColumn()
  readonly updated_at: Date
}
