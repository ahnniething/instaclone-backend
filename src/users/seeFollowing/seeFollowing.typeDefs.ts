import { gql } from "apollo-server";

export default gql`
  type SeeFollowingsResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    seeFollowing(username: String!, lastId: Int): SeeFollowingsResult!
  }
`;
