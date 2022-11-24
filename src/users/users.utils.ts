import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import client from "../client";
import { Context, Resolver } from "../types";

export const getUser = async (token: string | string[] | undefined) => {
  try {
    if (!token) {
      console.log("::getUser:::token이 없습니다.");
      return null;
    }
    const decodedPayload: any | string = await jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string
    );
    if (!decodedPayload) {
      console.log("::getUser:::Invalid token 입니다");
    }
    const loggedInUser: User | null = await client.user.findUnique({
      where: { id: decodedPayload?.id },
    });

    if (loggedInUser === null) {
      console.log("::getUser:::token으로 사용자를 찾을 수 없습니다.");
      return null;
    }
    console.log("::getUser:::로그인한 사용자입니다.", decodedPayload);
    return loggedInUser;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

export const protectedResolver =
  (ourResolver: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }

    return ourResolver(root, args, context, info);
  };
