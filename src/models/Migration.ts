import { Collection } from "fireorm";
import { Field, ID, ObjectType, Resolver } from "type-graphql";

import Model from "./Model";

@Collection("migrations")
@ObjectType({
  description: "The information for a migration"
})
export class Migration {
  @Field(() => ID)
  id: string;
  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}

export class MigrationModel extends Model<Migration> {
  constructor() {
    super({
      docSchema: Migration
    });
  }
}

@Resolver(of => Migration)
export class MigrationResolver extends new MigrationModel().Resolver {}
