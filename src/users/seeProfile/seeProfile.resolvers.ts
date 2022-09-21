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
        include: {
          following: true,
          followers: true,
        },
      }),
  },
};

export default resolvers;
