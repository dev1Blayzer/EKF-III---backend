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
