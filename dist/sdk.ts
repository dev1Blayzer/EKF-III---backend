import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};


export type Job = {
  __typename?: 'Job';
  address: Scalars['String'];
  customer?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  phone?: Maybe<Scalars['String']>;
  user: User;
};

export type JobInput = {
  customer?: Maybe<Scalars['String']>;
};

export type ListQueryInput = {
  back?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Float']>;
  next?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  orderDirection?: Maybe<Scalars['String']>;
  whereArrayContains?: Maybe<Scalars['String']>;
  whereArrayContainsAny?: Maybe<Scalars['String']>;
  whereEqual?: Maybe<Scalars['String']>;
  whereGreaterThan?: Maybe<Scalars['String']>;
  whereGreaterThanOrEqual?: Maybe<Scalars['String']>;
  whereIn?: Maybe<Scalars['String']>;
  whereLessThan?: Maybe<Scalars['String']>;
  whereLessThanOrEqual?: Maybe<Scalars['String']>;
};

export type Log = {
  __typename?: 'Log';
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  id: Scalars['ID'];
  input?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  output?: Maybe<Scalars['String']>;
  referrer: Scalars['String'];
  resolveTime: Scalars['Float'];
  type: Scalars['String'];
};

export type Migration = {
  __typename?: 'Migration';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addJob: Job;
  addUser: User;
  deleteJob: Job;
  deleteUser: User;
  editJob: Job;
  editUser: User;
  tieUserToJob: Job;
};


export type MutationAddJobArgs = {
  data: JobInput;
};


export type MutationAddUserArgs = {
  data: UserInput;
};


export type MutationDeleteJobArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationEditJobArgs = {
  data: JobInput;
  id: Scalars['String'];
};


export type MutationEditUserArgs = {
  data: UserInput;
  id: Scalars['String'];
};


export type MutationTieUserToJobArgs = {
  data: TieUserToJobInput;
};

export type Query = {
  __typename?: 'Query';
  job?: Maybe<Job>;
  jobs?: Maybe<Array<Job>>;
  log?: Maybe<Log>;
  logs?: Maybe<Array<Log>>;
  migration?: Maybe<Migration>;
  migrations?: Maybe<Array<Migration>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryJobArgs = {
  id: Scalars['String'];
};


export type QueryJobsArgs = {
  data?: Maybe<ListQueryInput>;
};


export type QueryLogArgs = {
  id: Scalars['String'];
};


export type QueryLogsArgs = {
  data?: Maybe<ListQueryInput>;
};


export type QueryMigrationArgs = {
  id: Scalars['String'];
};


export type QueryMigrationsArgs = {
  data?: Maybe<ListQueryInput>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  data?: Maybe<UserListQueryInput>;
};

export type TieUserToJobInput = {
  job: Scalars['String'];
  user: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  jobs: Array<Job>;
  name: Scalars['String'];
};

export type UserInput = {
  name?: Maybe<Scalars['String']>;
};

export type UserListQueryInput = {
  back?: Maybe<Scalars['String']>;
  hasEmail?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Float']>;
  next?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  orderDirection?: Maybe<Scalars['String']>;
  whereArrayContains?: Maybe<Scalars['String']>;
  whereArrayContainsAny?: Maybe<Scalars['String']>;
  whereEqual?: Maybe<Scalars['String']>;
  whereGreaterThan?: Maybe<Scalars['String']>;
  whereGreaterThanOrEqual?: Maybe<Scalars['String']>;
  whereIn?: Maybe<Scalars['String']>;
  whereLessThan?: Maybe<Scalars['String']>;
  whereLessThanOrEqual?: Maybe<Scalars['String']>;
};

export type EditUserMutationVariables = Exact<{
  id: Scalars['String'];
  data: UserInput;
}>;


export type EditUserMutation = (
  { __typename?: 'Mutation' }
  & { editUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type FindUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FindUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type TieUserToJobMutationVariables = Exact<{
  data: TieUserToJobInput;
}>;


export type TieUserToJobMutation = (
  { __typename?: 'Mutation' }
  & { tieUserToJob: (
    { __typename?: 'Job' }
    & Pick<Job, 'id' | 'customer'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);


export const EditUserDocument = gql`
    mutation EditUser($id: String!, $data: UserInput!) {
  editUser(id: $id, data: $data) {
    id
  }
}
    `;
export const FindUserDocument = gql`
    query findUser($userId: String!) {
  user(id: $userId) {
    id
    name
  }
}
    `;
export const TieUserToJobDocument = gql`
    mutation TieUserToJob($data: TieUserToJobInput!) {
  tieUserToJob(data: $data) {
    id
    customer
    user {
      id
      name
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    EditUser(variables: EditUserMutationVariables): Promise<EditUserMutation> {
      return withWrapper(() => client.request<EditUserMutation>(print(EditUserDocument), variables));
    },
    findUser(variables: FindUserQueryVariables): Promise<FindUserQuery> {
      return withWrapper(() => client.request<FindUserQuery>(print(FindUserDocument), variables));
    },
    TieUserToJob(variables: TieUserToJobMutationVariables): Promise<TieUserToJobMutation> {
      return withWrapper(() => client.request<TieUserToJobMutation>(print(TieUserToJobDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;