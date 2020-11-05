import { MiddlewareFn } from "type-graphql";

import logEvent from "../units/logEvent/logEvent";

export const logger: MiddlewareFn = async (
  { info, context }: { info: any; context: any },
  next
) => {
  const start = Date.now();
  const res = await next();
  if (["Query", "Mutation"].indexOf(info.parentType.name) >= 0) {
    const resolveTime = Date.now() - start;
    try {
      await logEvent({
        referrer: context.referrer,
        type: info.parentType.name,
        name: info.fieldName,
        input: info.variableValues,
        output: res,
        resolveTime
      });
    } catch (err) {
      console.log("Error creating log...", err);
    }
  }
};
