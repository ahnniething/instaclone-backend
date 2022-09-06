import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver((_, { username }, { client }) =>
      client.user.findUnique({
        where: {
          username
        }
      })
    )
  }
};

export default resolvers;
