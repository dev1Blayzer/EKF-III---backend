import { Field, ObjectType } from "type-graphql";

import { User } from "../models/User";

@ObjectType({
  description: "The test info for a user."
})
export class Test {
  @Field({
    nullable: true,
    description: "The test's email address"
  })
  email?: string;
  @Field(() => User!, {
    nullable: true,
    description: "The user's document attached to the donor"
  })
  user?: User;
}
