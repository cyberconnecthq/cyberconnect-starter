import { gql } from "@apollo/client";

export const GET_IDENTITY = gql`
  query GetIdentity($address: String!) {
    identity(address: $address) {
      address
      domain
      ens
      social {
        twitter
      }
      avatar
      joinTime
      followerCount
      followingCount
    }
  }
`;
