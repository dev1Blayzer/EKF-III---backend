import { Collection } from "fireorm";
import {
  Field,
  ID,
  ObjectType,
  Resolver,
  Root,
  FieldResolver
} from "type-graphql";

import Model from "./Model";
import { User, UserModel } from "./User";

@Collection("logs")
@ObjectType({
  description: "The information for an event logged on the system"
})
export class Log {
  @Field(() => ID)
  id: string;
  @Field({
    description: "The type of log"
  })
  type: string;
  @Field({
    description:
      "The name of the endpoint being accessed or event being responded to"
  })
  name: string;
  @Field({
    nullable: true,
    description: "The input data sent to the endpoint"
  })
  input?: string;
  @Field({
    nullable: true,
    description: "The output data returned to the endpoint"
  })
  output?: string;
  @Field({
    description: "The URL of the page that called out to the API"
  })
  referrer: string;
  @Field({
    description: "The amount of time it took the functionality to run"
  })
  resolveTime: number;
  @Field({
    nullable: true,
    description: "When the log was created"
  })
  createdAt?: string;
  @Field(() => User!, {
    nullable: true,
    description: "Who created the log"
  })
  createdBy?: User;
}

export class LogModel extends Model<Log> {
  constructor() {
    super({
      docSchema: Log
    });
  }
}

@Resolver(of => Log)
export class LogResolver extends new LogModel().Resolver {
  @FieldResolver()
  createdBy(@Root() data: Log): Promise<User> {
    return new UserModel().find(data.createdBy.id);
  }
}
