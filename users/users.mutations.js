import client from "../client";
import bcrypt from "bcrypt";

export default {
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
    },
    login: async (_, { username, password }) => {
      // find user with args.username
      const user = await client.user.findFirst({ where: username });
      if (!user) {
        return {
          ok: false,
          error: "User not found"
        };
      }
      // check password with args.password
      // issue a token and send it to the user
    }
  }
};
