import CyberConnect from "@cyberlab/cyberconnect";
import { ethers } from "ethers";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { useQuery } from "@apollo/client";
import { Identity } from "../types/identity";
import { GET_IDENTITY } from "@/queries/GetIdentity";

interface Web3ContextInterface {
  address: string | any;
  identity: Identity | null;
}

// create Context to pass data to different components
export const Web3Context = React.createContext<Web3ContextInterface>({
  address: "", // user's signed in address
  identity: null,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [identity, setIdentity] = useState<Identity | null>(null);

  //Fetch IdentityData: followers following num
  const identityData = useQuery(GET_IDENTITY, {
    variables: {
      address: address,
    },
  }).data;

  useEffect(() => {
    if (identityData) {
      setIdentity(identityData.identity);
    }
  }, [identityData]);

  return (
    <Web3Context.Provider
      value={{
        address,
        identity,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const web3 = useContext(Web3Context);
  return web3;
};
