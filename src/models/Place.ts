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
export class Place {
  @Field(() => ID)
  id: string;
  @Field({
    description: "The name of the Places"
  })
  name?: string;
}

@InputType({ description: "Editable Places data" })
export class PlaceInput implements Partial<Place> {
  @Field()
  name: string;
}

export class PlaceModel extends Model<Place> {
  constructor() {
    super({
      docSchema: Place,
      inputType: PlaceInput
    });
  }
}

@Resolver(of => Place)
export class PlaceResolver extends new PlaceModel().Resolver {
//   @FieldResolver()
//   user(@Root() data: Places): Promise<User> {
//     return new UserModel().find(data.user.id);
//   }
}