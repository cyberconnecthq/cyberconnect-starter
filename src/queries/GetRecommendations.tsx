import { gql } from "@apollo/client";

export const GET_RECOMMENDATIONS = gql`
  query($address: String!) {
    recommendations(address: $address) {
      result
      data {
        list {
          address
          domain
          recommendationReason
        }
      }
    }
  }
`;