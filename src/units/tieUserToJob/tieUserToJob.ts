import { Job, JobModel } from "../../models/Job";
import { UserModel } from "../../models/User";

import TieUserToJobInput from "../../inputs/tieUserToJob";

/**
 * This will tie a user to a job ticket
 */
export default async function tieUserToJobUnit(
  data: TieUserToJobInput
): Promise<Job> {
  const Jobs = new JobModel();
  const Users = new UserModel();
  const updatedJob = (await Jobs.update({
    ...(await Jobs.find(data.job)),
    user: Users.ref().doc(data.user)
  })) as any;
  updatedJob.user = await Users.find(data.user);

  return updatedJob;
}
