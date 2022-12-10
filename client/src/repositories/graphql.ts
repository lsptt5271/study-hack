import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: File;
};

export type Auth = {
  __typename?: 'Auth';
  exp: Scalars['Int'];
  token: Scalars['String'];
  user: User;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  menus: Array<Menu>;
  name: Scalars['String'];
};

export type CreateCategoryInput = {
  name: Scalars['String'];
};

export type CreateMenuInput = {
  categoryId: Scalars['Int'];
  image?: InputMaybe<Scalars['Upload']>;
  name: Scalars['String'];
};

export type CreateUserInput = {
  loginId: Scalars['String'];
  loginPassword: Scalars['String'];
  name: Scalars['String'];
};

export type DeleteCategoryInput = {
  categoryId: Scalars['Int'];
};

export type DeleteMenuInput = {
  menuId: Scalars['Int'];
};

export type GetStudiesInput = {
  endAt: Scalars['String'];
  menuIds: Array<Scalars['Int']>;
  startAt: Scalars['String'];
};

export type Menu = {
  __typename?: 'Menu';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Scalars['Boolean'];
  createMenu: Scalars['Boolean'];
  createUser: Auth;
  deleteCategory: Scalars['Boolean'];
  deleteMenu: Scalars['Boolean'];
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateMenuArgs = {
  input: CreateMenuInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};


export type MutationDeleteMenuArgs = {
  input: DeleteMenuInput;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  studies: Array<Study>;
};


export type QueryCategoriesArgs = {
  userId?: InputMaybe<Scalars['Int']>;
};


export type QueryStudiesArgs = {
  input: GetStudiesInput;
};

export type Study = {
  __typename?: 'Study';
  createdAt: Scalars['String'];
  endAt: Scalars['String'];
  id: Scalars['Int'];
  memo: Scalars['String'];
  startAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  loginId: Scalars['String'];
  name: Scalars['String'];
};

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: boolean };

export type DeleteCategoryMutationVariables = Exact<{
  input: DeleteCategoryInput;
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: boolean };

export type CreateMenuMutationVariables = Exact<{
  input: CreateMenuInput;
}>;


export type CreateMenuMutation = { __typename?: 'Mutation', createMenu: boolean };

export type DeleteMenuMutationVariables = Exact<{
  input: DeleteMenuInput;
}>;


export type DeleteMenuMutation = { __typename?: 'Mutation', deleteMenu: boolean };

export type RegisterUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Auth', exp: number, token: string, user: { __typename?: 'User', name: string, loginId: string } } };

export type GetStudiesQueryVariables = Exact<{
  input: GetStudiesInput;
}>;


export type GetStudiesQuery = { __typename?: 'Query', studies: Array<{ __typename?: 'Study', id: number, memo: string, startAt: string, endAt: string }> };

export type GetCategoriesQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string, menus: Array<{ __typename?: 'Menu', id: number, name: string }> }> };


export const CreateCategoryDocument = `
    mutation createCategory($input: CreateCategoryInput!) {
  createCategory(input: $input)
}
    `;
export const useCreateCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCategoryMutation, TError, CreateCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCategoryMutation, TError, CreateCategoryMutationVariables, TContext>(
      ['createCategory'],
      (variables?: CreateCategoryMutationVariables) => fetcher<CreateCategoryMutation, CreateCategoryMutationVariables>(client, CreateCategoryDocument, variables, headers)(),
      options
    );
export const DeleteCategoryDocument = `
    mutation deleteCategory($input: DeleteCategoryInput!) {
  deleteCategory(input: $input)
}
    `;
export const useDeleteCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCategoryMutation, TError, DeleteCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCategoryMutation, TError, DeleteCategoryMutationVariables, TContext>(
      ['deleteCategory'],
      (variables?: DeleteCategoryMutationVariables) => fetcher<DeleteCategoryMutation, DeleteCategoryMutationVariables>(client, DeleteCategoryDocument, variables, headers)(),
      options
    );
export const CreateMenuDocument = `
    mutation createMenu($input: CreateMenuInput!) {
  createMenu(input: $input)
}
    `;
export const useCreateMenuMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateMenuMutation, TError, CreateMenuMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateMenuMutation, TError, CreateMenuMutationVariables, TContext>(
      ['createMenu'],
      (variables?: CreateMenuMutationVariables) => fetcher<CreateMenuMutation, CreateMenuMutationVariables>(client, CreateMenuDocument, variables, headers)(),
      options
    );
export const DeleteMenuDocument = `
    mutation deleteMenu($input: DeleteMenuInput!) {
  deleteMenu(input: $input)
}
    `;
export const useDeleteMenuMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteMenuMutation, TError, DeleteMenuMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteMenuMutation, TError, DeleteMenuMutationVariables, TContext>(
      ['deleteMenu'],
      (variables?: DeleteMenuMutationVariables) => fetcher<DeleteMenuMutation, DeleteMenuMutationVariables>(client, DeleteMenuDocument, variables, headers)(),
      options
    );
export const RegisterUserDocument = `
    mutation registerUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      name
      loginId
    }
    exp
    token
  }
}
    `;
export const useRegisterUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>(
      ['registerUser'],
      (variables?: RegisterUserMutationVariables) => fetcher<RegisterUserMutation, RegisterUserMutationVariables>(client, RegisterUserDocument, variables, headers)(),
      options
    );
export const GetStudiesDocument = `
    query getStudies($input: GetStudiesInput!) {
  studies(input: $input) {
    id
    memo
    startAt
    endAt
  }
}
    `;
export const useGetStudiesQuery = <
      TData = GetStudiesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetStudiesQueryVariables,
      options?: UseQueryOptions<GetStudiesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetStudiesQuery, TError, TData>(
      ['getStudies', variables],
      fetcher<GetStudiesQuery, GetStudiesQueryVariables>(client, GetStudiesDocument, variables, headers),
      options
    );

useGetStudiesQuery.getKey = (variables: GetStudiesQueryVariables) => ['getStudies', variables];
;

export const GetCategoriesDocument = `
    query getCategories($userId: Int!) {
  categories(userId: $userId) {
    id
    name
    menus {
      id
      name
    }
  }
}
    `;
export const useGetCategoriesQuery = <
      TData = GetCategoriesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCategoriesQueryVariables,
      options?: UseQueryOptions<GetCategoriesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCategoriesQuery, TError, TData>(
      ['getCategories', variables],
      fetcher<GetCategoriesQuery, GetCategoriesQueryVariables>(client, GetCategoriesDocument, variables, headers),
      options
    );

useGetCategoriesQuery.getKey = (variables: GetCategoriesQueryVariables) => ['getCategories', variables];
;
