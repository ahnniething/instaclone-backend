import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      await client.user.update({
        where: {
          id: loggedInUser?.id,
        },
        data: {
          following: {
            connect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
