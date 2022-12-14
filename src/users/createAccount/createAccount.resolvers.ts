import client from "../../client";
import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        //error handling
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }
        // hash password
        const codedPassword = await bcrypt.hash(password, 10);
        // save and return
        await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: codedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Can't create account.",
        };
      }
    },
  },
};

export default resolvers;
