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
export class Specials {
  @Field(() => ID)
  id: string;
  @Field({
    description: "The name of the Specials"
  })
  name?: string;
}

@InputType({ description: "Editable Specials data" })
export class SpecialsInput implements Partial<Specials> {
  @Field()
  name: string;
}

export class SpecialsModel extends Model<Specials> {
  constructor() {
    super({
      docSchema: Specials,
      inputType: SpecialsInput
    });
  }
}

@Resolver(of => Specials)
export class SpecialsResolver extends new SpecialsModel().Resolver {
//   @FieldResolver()
//   user(@Root() data: Specials): Promise<User> {
//     return new UserModel().find(data.user.id);
//   }
}