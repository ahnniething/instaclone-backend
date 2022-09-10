import * as jwt from "jsonwebtoken";
import client from "../client";
import { Context, Resolver } from "../types";

export const getUser = async (token: string | string[] | undefined) => {
  try {
    if (!token) {
      return new Error();
    }
    if (process.env.SECRET_KEY) {
      const verifiedToken: any = await jwt.verify(
        token as string,
        process.env.SECRET_KEY
      );

      if ("id" in verifiedToken) {
        const user = await client.user.findUnique({
          where: { id: verifiedToken["id"] },
        });
        if (user) {
          return user;
        }
      }
    }
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action",
      };
    }
    return ourResolver(root, args, context, info);
  };
