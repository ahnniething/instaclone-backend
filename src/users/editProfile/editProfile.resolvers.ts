import * as bcrypt from "bcrypt";
import { Resolver, Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import { AvatarFile } from "../../shared/shared.interfaces";
import { createWriteStream } from "fs";

const resolverFn: Resolver = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser, client }
) => {
  //upload files to uploads folder
  // console.log("::editProfile resolver:::avatar", avatar);
  const { filename, createReadStream }: AvatarFile = await avatar.file;
  const readStream = createReadStream();
  //process.cwd(): current working directory
  const writeStream = createWriteStream(
    //파일명 중복방지
    process.cwd() + "/uploads/" + loggedInUser?.id + Date.now() + filename
  );
  readStream.pipe(writeStream);

  //
  let decodedPassword = null;
  if (newPassword) {
    decodedPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser!.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(decodedPassword && { password: decodedPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};

export default resolvers;
