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

@Collection("places")
@ObjectType({
  description: "The information for a Places document"
})
export class Places {
  @Field(() => ID)
  id: string;
  @Field({
    description: "The name of the Places"
  })
  name?: string;
}

@InputType({ description: "Editable Places data" })
export class PlacesInput implements Partial<Places> {
  @Field()
  name: string;
}

export class PlacesModel extends Model<Places> {
  constructor() {
    super({
      docSchema: Places,
      inputType: PlacesInput
    });
  }
}

@Resolver(of => Places)
export class PlacesResolver extends new PlacesModel().Resolver {
//   @FieldResolver()
//   user(@Root() data: Places): Promise<User> {
//     return new UserModel().find(data.user.id);
//   }
}