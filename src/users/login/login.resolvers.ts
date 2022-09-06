import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      // find user with args.username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found."
        };
      }
      // check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password."
        };
      }
      // issue a token(jwt) and send it to the user
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY!);
      return {
        ok: true,
        token
      };
    }
  }
};

export default resolvers;
