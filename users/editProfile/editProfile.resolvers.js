import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword },
      { loggedInUser }
    ) => {
      if (!loggedInUser) {
        throw new Error("You need to login.");
      }
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUSer = await client.user.update({
        where: {
          id: loggedInUser.id
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
    }
  }
};
