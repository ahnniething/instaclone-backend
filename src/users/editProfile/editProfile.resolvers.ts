import * as bcrypt from "bcrypt";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolverFn: Resolver = async (
  _,
  { firstName, lastName, username, email, password: newPassword },
  { loggedInUser, client }
) => {
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUSer = await client.user.update({
    where: {
      id: loggedInUser!.id
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      ...(uglyPassword && { password: uglyPassword })
    }
  });
  if (updatedUSer) {
    return {
      ok: true
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile."
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(resolverFn)
  }
};

export default resolvers;
