import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import authChecker from "./auth";
import connect from "./connect";
import env from "./env";
import session from "./session";
import { logger } from "./middlewares/logger";
import admin from "firebase-admin";

(async () => {
  const db = connect();
  const server = new ApolloServer({
    context: ({ req }) => session({ req, admin, db }),
    schema: await buildSchema({
      resolvers: [
        __dirname + "/models/**/*.{ts,js}",
        __dirname + "/resolvers/**/*.{ts,js}",
      ],
      emitSchemaFile: env("graphql.schema.emit", {
        path: env("graphql.schema.path", __dirname + "/../schema.gql"),
        commentDescriptions: env("graphql.schema.commentDescriptions", true),
      }),
      authChecker,
      // authMode: "null",
      globalMiddlewares: [logger],
    }),
    introspection: env("graphql.introspection", true),
  });

  const serverInfo = await server.listen({
    port: env("graphql.port", process.env.PORT ? process.env.PORT : 4000),
  });
  console.log(
    `🚀  Server running on ${env("name", "local")} and ready at ${
      serverInfo.url
    }`
  );
})().catch((error) => console.log(error));
