interface IdentityArgs {
  address: string;
  namespace?: string;
  network?: string;
  followingFirst?: number;
  followingAfter?: string;
  followerFirst?: number;
  followerAfter?: string;
}

interface FollowStatusArgs {
  fromAddr: string;
  toAddr: string;
  namespace?: string;
  network?: string;
}

interface BasicInfo {
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  list: {
    ens: string;
    address: string;
    avatar: string;
  }[];
}

export interface Identity {
  followingCount: number;
  followerCount: number;
  followings: BasicInfo;
  followers: BasicInfo;
}

const endPoint = 'https://api.cybertino.io/connect/';

export const identitySchema = ({
  address,
  namespace,
  network,
  followingFirst,
  followingAfter,
  followerFirst,
  followerAfter,
}: IdentityArgs) => {
  return {
    operationName: 'identity',
    query: `query identity($address: String!, $namespace: String, $network: String, $followingFirst: Int, $followingAfter: String, $followerFirst: Int, $followerAfter: String) {
      identity(address: $address, network: $network) {
        followingCount(namespace: $namespace, network: $network)
        followerCount(namespace: $namespace, network: $network)
        followings(namespace: $namespace, network: $network, first: $followingFirst, after: $followingAfter) {
          pageInfo {
            endCursor
            hasNextPage
          }
          list {
            address
            ens
            avatar
          }
        }
        followers(namespace: $namespace, network: $network, first: $followerFirst, after: $followerAfter) {
          pageInfo {
            endCursor
            hasNextPage
          }
          list {
            address
            ens
            avatar
          }
        }
      }
    }`,
    variables: {
      address,
      namespace,
      network,
      followingFirst,
      followingAfter,
      followerFirst,
      followerAfter,
    },
  };
};

export const followStatusSchema = ({
  fromAddr,
  toAddr,
  namespace,
  network,
}: FollowStatusArgs) => {
  return {
    operationName: 'followStatus',
    query: `query followStatus($fromAddr: String!, $toAddr: String!, $namespace: String, $network: String) {
      followStatus(fromAddr: $fromAddr, toAddr: $toAddr, namespace: $namespace, network: $network) {
        isFollowed
        isFollowing
      }
    }`,
    variables: { fromAddr, toAddr, namespace, network },
  };
};

export const querySchemas = {
  identity: identitySchema,
  followStatus: followStatusSchema,
};

export const request = async (url = '', data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  return response.json();
};

export const handleQuery = (
  data: {
    query: string;
    variables: object;
    operationName: string;
  },
  url: string
) => {
  return request(url, data);
};

export const identity = async ({
  address,
  namespace,
  network,
  followingFirst,
  followingAfter,
  followerFirst,
  followerAfter,
}: IdentityArgs) => {
  const schema = querySchemas['identity']({
    address,
    namespace,
    network,
    followingFirst,
    followingAfter,
    followerFirst,
    followerAfter,
  });
  const resp = await handleQuery(schema, endPoint);

  return (resp?.data?.identity as Identity) || null;
};

export const followStatus = async ({
  fromAddr,
  toAddr,
  namespace,
  network,
}: FollowStatusArgs) => {
  const schema = querySchemas['followStatus']({
    fromAddr,
    toAddr,
    namespace,
    network,
  });
  const resp = await handleQuery(schema, endPoint);

  return resp?.data?.followStatus || null;
};
