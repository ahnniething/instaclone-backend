import { User } from ".prisma/client";
import { Context, Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowing: async (
      parent: User,
      args,
      { client }: Context
    ): Promise<number> => {
      try {
        const countedFollowing: number = await client.user.count({
          where: { followers: { some: { id: parent.id } } },
        });
        return countedFollowing;
      } catch (error) {
        console.log("totalFollowing error");
        return 0;
      }
    },
    totalFollowers: async (
      parent: User,
      args,
      { client }: Context
    ): Promise<number> => {
      try {
        const countedFollowers: number = await client.user.count({
          where: { following: { some: { id: parent.id } } },
        });
        return countedFollowers;
      } catch (error) {
        console.log("totalFollowers error");
        return 0;
      }
    },
  },
};

export default resolvers;

// 이렇게 하려면 include를 사용해 모든 유저를 가져와야 하므로 DB에 좋지 않다.
// totalFollowers: (parent) => parent.followers.length,
// totalFollowing: (parent) => parent.following.length,
