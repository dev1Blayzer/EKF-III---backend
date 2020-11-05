import * as functions from "firebase-functions";
import * as path from "path";

export default function env(key?: string, fallback?: any) {
  let config = {};

  try {
    config = require(path.join(__dirname, "../environment.json"));
  } catch (error) {
    console.log("No environment.json file found in the root.");
  }

  const functionsConfig = functions.config();

  if (Object.keys(functionsConfig).length > 0) {
    config = { ...functionsConfig, ...config };
  }

  const value = !key
    ? config
    : key && key.indexOf(".") >= 0
    ? key.split(".").reduce((p, c) => p && p[c], config)
    : key && typeof config[key] !== "undefined"
    ? config[key]
    : null;

  return fallback &&
    ((!value && value !== false && value !== 0) ||
      typeof value === "undefined" ||
      value === null)
    ? fallback
    : value;
}
