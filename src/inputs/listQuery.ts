import { Field, InputType } from "type-graphql";

@InputType({ description: "The default input to use for all list queries" })
export default class ListQueryInput {
  @Field({
    nullable: true,
    description: "The number of results to return"
  })
  limit?: number;
  @Field({
    nullable: true,
    description: "Order the list of results by this field"
  })
  orderBy?: string;
  @Field(() => String, {
    nullable: true,
    description: "The directions to order the results"
  })
  orderDirection?: "asc" | "desc";
  @Field({
    nullable: true,
    description: "Where a column matches a value"
  })
  whereEqual?: string;
  @Field({
    nullable: true,
    description: "Where a column is less than a value"
  })
  whereLessThan?: string;
  @Field({
    nullable: true,
    description: "Where a column is less than or equal to a value"
  })
  whereLessThanOrEqual?: string;
  @Field({
    nullable: true,
    description: "Where a column is greater than a value"
  })
  whereGreaterThan?: string;
  @Field({
    nullable: true,
    description: "Where a column is greater than or equal to a value"
  })
  whereGreaterThanOrEqual?: string;
  @Field({
    nullable: true,
    description: "Where a list of values for a column contains a value"
  })
  whereArrayContains?: string;
  @Field({
    nullable: true,
    description: "Where a column value is any of array of values"
  })
  whereArrayContainsAny?: string;
  @Field({
    nullable: true,
    description: "Where a column value is in an array of values"
  })
  whereIn?: string;
  @Field({
    nullable: true,
    description: "The ID of the last result from the current page"
  })
  next?: string;
  @Field({
    nullable: true,
    description: "The ID of the first result from the current"
  })
  back?: string;
}
