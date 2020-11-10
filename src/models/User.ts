import { Collection } from "fireorm";
import {
  Authorized,
  Field,
  ID,
  ObjectType,
  Resolver,
  Root,
  FieldResolver,
  InputType
} from "type-graphql";

import Model from "./Model";
import { Job, JobModel } from "./Job";
import ListQueryInput from "../inputs/listQuery";

@Collection("users")
@ObjectType({ description: "The information for a user" })
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String,{
	  nullable: true,
	  description: "The user's full name"
	  
  })
  given_name?: string;

  @Field(() => String, {
    nullable: true,
    description: "The user's email address"
  })
  email?: string;

  @Authorized()
  @Field(() => [Job])
  jobs?: Job[];
}

@InputType({ description: "Editable user data" })
export class UserInput implements Partial<User> {
  @Field({ nullable: true })
  given_name?: string;
	
}

@InputType({
  description: "A custom set of params to use when doing list query"
})
export class UserListQueryInput extends ListQueryInput {
  @Field({ nullable: true })
  hasEmail?: boolean;
}

export class UserModel extends Model<User> {
  constructor() {
    super({
      docSchema: User,
      inputType: UserInput,
      listQueryInputType: UserListQueryInput
    });
  }

  async onBeforeAdd(data: UserInput) {
    console.log("Before Add - ", data);

    return data;
  }

  async onAfterAdd(data: UserInput) {
    console.log("After Add - ", data);

    return data;
  }

  async onBeforeEdit(data: UserInput) {
    console.log("Before Edit - ", data);

    return data;
  }

  async onAfterEdit(data: UserInput) {
    console.log("After Edit - ", data);

    return data;
  }

  async onBeforeDelete(data) {
    console.log("Before Delete - ", data);

    return data;
  }

  async onAfterDelete(data) {
    console.log("After Delete - ", data);

    return data;
  }

  async onBeforeFind(id: string) {
    console.log("Before Find - ", id);

    return this.find(id);
  }

  async onAfterFind(data: Job) {
    console.log("After Find - ", data);

    return data;
  }

  async onBeforeList(data: UserListQueryInput = {}) {
    console.log("Before List - ", data);

    let userListQuery: any = this.limit(data.limit ? data.limit : 15);

    if (data.hasEmail) {
      userListQuery = userListQuery.whereGreaterOrEqualThan("email", "");
    }

    return userListQuery.find();
  }

  async onAfterList(data: User[]) {
    console.log("After List - ", data);

    return data;
  }

  async jobsForId(id: string): Promise<Job[]> {
    return (
      await new JobModel()
        .ref()
        .where("user", "==", this.ref().doc(id))
        .get()
    ).docs.map(doc => ({ ...doc.data(), id: doc.id })) as any;
  }
}

@Resolver(of => User)
export class UserResolver extends new UserModel().Resolver {
  @FieldResolver({
    description: "A list of jobs the user is attached to."
  })
  jobs(@Root() user: User): Promise<Job[]> {
    return new UserModel().jobsForId(user.id);
  }
}
