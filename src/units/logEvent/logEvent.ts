import admin from "firebase-admin";

import { Log, LogModel } from "../../models/Log";

function cleanObject(obj: any) {
  const newObj = {};
  for (const key of Object.keys(obj)) {
    newObj[key] =
      obj[key] && typeof obj[key] === "object" && !!obj[key]._firestore
        ? { id: obj[key].id, path: obj[key].path }
        : obj[key];
  }

  return newObj;
}

function cleanAndStringifyData(input: any) {
  if (typeof input === "string") return input;

  return JSON.stringify(
    typeof input === "object" && input.length
      ? input.map(row => cleanObject(row))
      : cleanObject(input),
    null,
    2
  );
}

/**
 * This creates a log for an event on the system
 */
export default async function logEvent(data: Partial<Log>): Promise<any> {
  if (!data || !data.type || !data.name)
    throw new Error("Type and Name of event are required!");

  const log = await new LogModel().create({
    ...data,
    createdAt: data.createdAt
      ? data.createdAt
      : (admin.firestore.FieldValue.serverTimestamp() as any),
    resolveTime: data.resolveTime ? data.resolveTime : 0,
    input: data.input ? cleanAndStringifyData(data.input) : "{}",
    output: data.output ? cleanAndStringifyData(data.output) : "{}"
  });
  console.log(`${log.id} - ${data.type}.${data.name} [${data.resolveTime} ms]`);

  return log;
}
