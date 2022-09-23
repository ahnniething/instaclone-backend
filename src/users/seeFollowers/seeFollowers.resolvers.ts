import client from "../../client";
import { Resolvers, Context } from "../../types";

interface SeeFollowersArgs {
  username: string;
  cursor?: string;
}

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      return {
        ok: true,
        followers,
      };
    },
  },
};

export default resolvers;
