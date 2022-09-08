require("dotenv").config();

import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    console.log(req.headers.authorization);
    if (req.headers.authorization) {
      return {
        loggedInUser: await getUser(req.headers.authorization),
        client: client,
      };
    } else {
      return {
        client: client,
      };
      // throw new Error("인증되지 않은 사용자입니다.");
    }
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`🚀 Server is running on http://localhost:${PORT} ✅`)
  );
