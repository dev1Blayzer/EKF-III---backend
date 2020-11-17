"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const auth_1 = require("./auth");
const connect_1 = require("./connect");
const env_1 = require("./env");
const session_1 = require("./session");
const logger_1 = require("./middlewares/logger");
const firebase_admin_1 = require("firebase-admin");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const db = connect_1.default();
    const server = new apollo_server_1.ApolloServer({
        context: ({ req }) => session_1.default({ req, admin: firebase_admin_1.default, db }),
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                __dirname + "/models/**/*.{ts,js}",
                __dirname + "/resolvers/**/*.{ts,js}",
            ],
            emitSchemaFile: env_1.default("graphql.schema.emit", {
                path: env_1.default("graphql.schema.path", __dirname + "/../schema.gql"),
                commentDescriptions: env_1.default("graphql.schema.commentDescriptions", true),
            }),
            authChecker: auth_1.default,
            // authMode: "null",
            globalMiddlewares: [logger_1.logger],
        }),
        introspection: env_1.default("graphql.introspection", true),
    });
    const serverInfo = yield server.listen({
        port: env_1.default("graphql.port", process.env.PORT ? process.env.PORT : 4000),
    });
    console.log(`🚀  Server running on ${env_1.default("name", "local")} and ready at ${serverInfo.url}`);
}))().catch((error) => console.log(error));
//# sourceMappingURL=index.js.map