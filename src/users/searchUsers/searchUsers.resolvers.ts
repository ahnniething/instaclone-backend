import client from "../../client";
import { Resolvers, Context } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword }) => {
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });

      return users;
    },
  },
};

export default resolvers;
