import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword },
      { token }
    ) => {
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUSer = await client.user.update({
        where: {
          id
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
