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

@Collection("specials")
@ObjectType({
  description: "The information for a Specials document"
})
export class Special {
  @Field(() => ID)
  id: string;
  @Field({
    description: "The name of the Specials"
  })
  name?: string;
}

@InputType({ description: "Editable Specials data" })
export class SpecialInput implements Partial<Special> {
  @Field()
  name: string;
}

export class SpecialModel extends Model<Special> {
  constructor() {
    super({
      docSchema: Special,
      inputType: SpecialInput
    });
  }
}

@Resolver(of => Special)
export class SpecialResolver extends new SpecialModel().Resolver {
//   @FieldResolver()
//   user(@Root() data: Specials): Promise<User> {
//     return new UserModel().find(data.user.id);
//   }
}