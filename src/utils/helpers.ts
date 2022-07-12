//format the address display
export const formatAddress = (address: string) => {
  const len = address.length;
  return address.substr(0, 5) + "..." + address.substring(len - 4, len);
};
//check if the address is valid
export const isValidAddr = (address: string) => {
  const re = /^0x[a-fA-F0-9]{40}$/;
  return address.match(re);
};
