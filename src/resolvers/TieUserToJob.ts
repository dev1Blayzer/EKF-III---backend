import { Arg, Mutation, Resolver } from "type-graphql";

import { Job } from "../models/Job";

import TieUserToJobInput from "../inputs/tieUserToJob";

import tieUserToJobUnit from "../units/tieUserToJob/tieUserToJob";

@Resolver()
export class TieUserToJobResolver {
  @Mutation(() => Job)
  async tieUserToJob(@Arg("data") data: TieUserToJobInput): Promise<Job> {
    return tieUserToJobUnit(data);
  }
}
