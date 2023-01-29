import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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


export const CreateCategoryDocument = gql`
    mutation createCategory($input: CreateCategoryInput!) {
  createCategory(input: $input)
}
    `;
export const DeleteCategoryDocument = gql`
    mutation deleteCategory($input: DeleteCategoryInput!) {
  deleteCategory(input: $input)
}
    `;
export const CreateMenuDocument = gql`
    mutation createMenu($input: CreateMenuInput!) {
  createMenu(input: $input)
}
    `;
export const DeleteMenuDocument = gql`
    mutation deleteMenu($input: DeleteMenuInput!) {
  deleteMenu(input: $input)
}
    `;
export const RegisterUserDocument = gql`
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
export const GetStudiesDocument = gql`
    query getStudies($input: GetStudiesInput!) {
  studies(input: $input) {
    id
    memo
    startAt
    endAt
  }
}
    `;
export const GetCategoriesDocument = gql`
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createCategory(variables: CreateCategoryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCategoryMutation>(CreateCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createCategory', 'mutation');
    },
    deleteCategory(variables: DeleteCategoryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCategoryMutation>(DeleteCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteCategory', 'mutation');
    },
    createMenu(variables: CreateMenuMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateMenuMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMenuMutation>(CreateMenuDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createMenu', 'mutation');
    },
    deleteMenu(variables: DeleteMenuMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteMenuMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMenuMutation>(DeleteMenuDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteMenu', 'mutation');
    },
    registerUser(variables: RegisterUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterUserMutation>(RegisterUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'registerUser', 'mutation');
    },
    getStudies(variables: GetStudiesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetStudiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStudiesQuery>(GetStudiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getStudies', 'query');
    },
    getCategories(variables: GetCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoriesQuery>(GetCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategories', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;