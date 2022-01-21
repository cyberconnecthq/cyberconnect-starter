interface IdentityArgs {
  address: string;
  namespace?: string;
  network?: string;
  first?: number;
  after?: string;
}

export const followingsSchema = ({
  address,
  namespace,
  network,
  first,
  after,
}: IdentityArgs) => {
  return {
    operationName: 'identity',
    query: `query identity($address: String!, $namespace: String, $network: String, $first: Int, $after: String) {
      identity(address: $address, network: $network) {
        followingCount(namespace: $namespace, network: $network)
        followings(namespace: $namespace, network: $network, first: $first, after: $after) {
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
    variables: { address, namespace, network, first, after },
  };
};

export const followersSchema = ({
  address,
  namespace,
  network,
  first,
  after,
}: IdentityArgs) => {
  return {
    operationName: 'identity',
    query: `query identity($address: String!, $namespace: String, $network: String, $first: Int, $after: String) {
      identity(address: $address, network: $network) {
        followerCount(namespace: $namespace, network: $network)
        followers(namespace: $namespace, network: $network, first: $first, after: $after) {
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
    variables: { address, namespace, network, first, after },
  };
};

export const querySchemas = {
  followings: followingsSchema,
  followers: followersSchema,
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

export const followings = async ({
  address,
  namespace,
  network,
  first,
  after,
  url,
}: IdentityArgs & { url: string }) => {
  const schema = querySchemas['followings']({
    address,
    namespace,
    network,
    first,
    after,
  });
  const resp = await handleQuery(schema, url);

  return resp?.data?.identity || {};
};

export const followers = async ({
  address,
  namespace,
  network,
  first,
  after,
  url,
}: IdentityArgs & { url: string }) => {
  const schema = querySchemas['followers']({
    address,
    namespace,
    network,
    first,
    after,
  });
  const resp = await handleQuery(schema, url);

  return resp?.data?.identity || {};
};
