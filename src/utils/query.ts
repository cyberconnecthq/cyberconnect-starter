export type Query = 'connect' | 'disconnect';

export const allFollowingsSchema = ({
  address,
  namespace,
}: {
  address: string;
  namespace?: string;
}) => {
  return {
    operationName: 'allFollowings',
    query: `query allFollowings($address: String!, $namespace: String) {
      allFollowings(address: $address, namespace: $namespace) {
        address
        ens
        alias
        namespace
        lastModifiedTime
      }
    }`,
    variables: { address, namespace },
  };
};

export const querySchemas = {
  allFollowings: allFollowingsSchema,
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

export const allFollowings = async ({
  address,
  namespace,
  url,
}: {
  address: string;
  namespace: string;
  url: string;
}) => {
  const schema = querySchemas['allFollowings']({
    address,
    namespace,
  });
  const resp = await handleQuery(schema, url);

  return resp?.data?.allFollowings || [];
};
