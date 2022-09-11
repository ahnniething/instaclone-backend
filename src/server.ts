require("dotenv").config();

import { ApolloServer, ExpressContext } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import express, { Express } from "express";
import schema from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";

const PORT = process.env.PORT;

const startServer = async (): Promise<void> => {
  const apolloServer: ApolloServer<ExpressContext> = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client: client,
      };
    },
  });

  await apolloServer.start();
  const app: Express = express();
  app.use(graphqlUploadExpress());
  apolloServer.applyMiddleware({ app });
  await new Promise((func) => app.listen({ port: PORT }, func as VoidFunction));
  console.log(`🚀 Server: http://localhost:${PORT}${apolloServer.graphqlPath}`);
};
startServer();
