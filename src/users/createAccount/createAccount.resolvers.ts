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
                username
              },
              {
                email
              }
            ]
          }
        });
        //error handling
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        // save and return
        return client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: uglyPassword
          }
        });
      } catch (e) {
        return e;
      }
    }
  }
};

export default resolvers;
