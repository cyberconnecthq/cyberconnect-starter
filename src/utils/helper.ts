export const formatAddress = (address: string) => {
  const len = address.length;
  return address.substr(0, 5) + '...' + address.substring(len - 4, len);
};
