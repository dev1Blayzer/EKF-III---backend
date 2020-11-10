import { Collection } from "fireorm";
import {
  Field,
  ID,
  ObjectType,
  Resolver,
  Root,
  FieldResolver,
  InputType
} from "type-graphql";

import Model from "./Model";

@Collection("users")
@ObjectType({
  description: "The information for a Users document"
})
export class Users {
  @Field(() => ID)
  id: string;
  @Field({
    description: "The name of the Users"
  })
  name?: string;
}

@InputType({ description: "Editable Users data" })
export class UsersInput implements Partial<Users> {
  @Field()
  name: string;
}

export class UsersModel extends Model<Users> {
  constructor() {
    super({
      docSchema: Users,
      inputType: UsersInput
    });
  }
}

@Resolver(of => Users)
export class UsersResolver extends new UsersModel().Resolver {
//   @FieldResolver()
//   user(@Root() data: Users): Promise<User> {
//     return new UserModel().find(data.user.id);
//   }
}