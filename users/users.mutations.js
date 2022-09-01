import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { id, firstName, lastName, username, email, createdAt, updateAt }
    ) => {
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
      console.log(existingUser);
      // hash password
      // save and return
    }
  }
};
