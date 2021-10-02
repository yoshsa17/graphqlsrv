import { GraphQLResolveInfo } from 'graphql'
import { User as UserEntity, Post as PostEntity } from 'src/database/entity'
import { IApolloServerCtx } from 'src/lib/interfaces'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type LoginInput = {
  readonly email: Scalars['String']
  readonly password: Scalars['String']
}

export type Mutation = {
  readonly __typename?: 'Mutation'
  readonly createPost?: Maybe<Post>
  readonly deletePost: Scalars['Boolean']
  readonly login?: Maybe<User>
  readonly logout?: Maybe<Scalars['Boolean']>
  readonly signUp?: Maybe<User>
  readonly updatePost: Scalars['Boolean']
  readonly vote: Scalars['Boolean']
}

export type MutationCreatePostArgs = {
  input: CreatePostInput
}

export type MutationDeletePostArgs = {
  id: Scalars['Int']
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationSignUpArgs = {
  input: SignUpInput
}

export type MutationUpdatePostArgs = {
  input: UpdatePostInput
}

export type MutationVoteArgs = {
  postId: Scalars['Int']
  value: Scalars['Int']
}

export type Post = {
  readonly __typename?: 'Post'
  readonly created_at: Scalars['String']
  readonly id: Scalars['ID']
  readonly owner?: Maybe<User>
  readonly owner_id: Scalars['Int']
  readonly points: Scalars['Int']
  readonly text: Scalars['String']
  readonly title: Scalars['String']
  readonly updated_at: Scalars['String']
}

export type PostsResult = {
  readonly __typename?: 'PostsResult'
  readonly hasNext: Scalars['Boolean']
  readonly hasPrevious: Scalars['Boolean']
  readonly posts: ReadonlyArray<Maybe<Post>>
}

export type Query = {
  readonly __typename?: 'Query'
  /** this is first hello query! */
  readonly hello?: Maybe<Scalars['String']>
  readonly me?: Maybe<User>
  readonly post?: Maybe<Post>
  readonly posts: PostsResult
}

export type QueryPostArgs = {
  id: Scalars['Int']
}

export type QueryPostsArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type SignUpInput = {
  readonly email: Scalars['String']
  readonly password: Scalars['String']
  readonly username: Scalars['String']
}

export type User = {
  readonly __typename?: 'User'
  readonly email: Scalars['String']
  readonly id: Scalars['ID']
  readonly info?: Maybe<Scalars['String']>
  readonly posts: ReadonlyArray<Maybe<Post>>
  readonly username: Scalars['String']
}

export type CreatePostInput = {
  readonly text: Scalars['String']
  readonly title: Scalars['String']
}

export type UpdatePostInput = {
  readonly id: Scalars['Int']
  readonly text: Scalars['String']
  readonly title: Scalars['String']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  LoginInput: LoginInput
  Mutation: ResolverTypeWrapper<{}>
  Post: ResolverTypeWrapper<PostEntity>
  PostsResult: ResolverTypeWrapper<
    Omit<PostsResult, 'posts'> & {
      posts: ReadonlyArray<Maybe<ResolversTypes['Post']>>
    }
  >
  Query: ResolverTypeWrapper<{}>
  SignUpInput: SignUpInput
  String: ResolverTypeWrapper<Scalars['String']>
  User: ResolverTypeWrapper<UserEntity>
  createPostInput: CreatePostInput
  updatePostInput: UpdatePostInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']
  ID: Scalars['ID']
  Int: Scalars['Int']
  LoginInput: LoginInput
  Mutation: {}
  Post: PostEntity
  PostsResult: Omit<PostsResult, 'posts'> & {
    posts: ReadonlyArray<Maybe<ResolversParentTypes['Post']>>
  }
  Query: {}
  SignUpInput: SignUpInput
  String: Scalars['String']
  User: UserEntity
  createPostInput: CreatePostInput
  updatePostInput: UpdatePostInput
}

export type MutationResolvers<
  ContextType = IApolloServerCtx,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createPost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreatePostArgs, 'input'>
  >
  deletePost?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostArgs, 'id'>
  >
  login?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'input'>
  >
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  signUp?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, 'input'>
  >
  updatePost?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePostArgs, 'input'>
  >
  vote?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationVoteArgs, 'postId' | 'value'>
  >
}

export type PostResolvers<
  ContextType = IApolloServerCtx,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = {
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  owner_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PostsResultResolvers<
  ContextType = IApolloServerCtx,
  ParentType extends ResolversParentTypes['PostsResult'] = ResolversParentTypes['PostsResult']
> = {
  hasNext?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  hasPrevious?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  posts?: Resolver<
    ReadonlyArray<Maybe<ResolversTypes['Post']>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = IApolloServerCtx,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  post?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryPostArgs, 'id'>
  >
  posts?: Resolver<
    ResolversTypes['PostsResult'],
    ParentType,
    ContextType,
    RequireFields<QueryPostsArgs, 'limit' | 'offset'>
  >
}

export type UserResolvers<
  ContextType = IApolloServerCtx,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  posts?: Resolver<
    ReadonlyArray<Maybe<ResolversTypes['Post']>>,
    ParentType,
    ContextType
  >
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = IApolloServerCtx> = {
  Mutation?: MutationResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  PostsResult?: PostsResultResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  User?: UserResolvers<ContextType>
}
