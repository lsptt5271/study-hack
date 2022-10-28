import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from 'react-query';
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
};

export type Query = {
  __typename?: 'Query';
  studies: Array<Study>;
};

export type Study = {
  __typename?: 'Study';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type GetStudiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudiesQuery = { __typename?: 'Query', studies: Array<{ __typename?: 'Study', id: number, name: string }> };


export const GetStudiesDocument = `
    query getStudies {
  studies {
    id
    name
  }
}
    `;
export const useGetStudiesQuery = <
      TData = GetStudiesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetStudiesQueryVariables,
      options?: UseQueryOptions<GetStudiesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetStudiesQuery, TError, TData>(
      variables === undefined ? ['getStudies'] : ['getStudies', variables],
      fetcher<GetStudiesQuery, GetStudiesQueryVariables>(client, GetStudiesDocument, variables, headers),
      options
    );

useGetStudiesQuery.getKey = (variables?: GetStudiesQueryVariables) => variables === undefined ? ['getStudies'] : ['getStudies', variables];
;
