import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import client from "../../client";

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};

export default resolvers;
