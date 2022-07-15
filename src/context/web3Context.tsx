import CyberConnect from "@cyberlab/cyberconnect";
import { ethers } from "ethers";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { useQuery } from "@apollo/client";
import { Identity } from "../types/identity";
import { Recommendations } from "../types/recommendations";
import { GET_IDENTITY } from "@/queries/GetIdentity";
import { GET_RECOMMENDATIONS } from "@/queries/GetRecommendations";

interface Web3ContextInterface {
  address: string | any;
  identity: Identity | null;
  recommendations: Recommendations | null;
}

// create Context to pass data to different components
export const Web3Context = React.createContext<Web3ContextInterface>({
  address: "", // user's signed in address
  identity: null,
  recommendations: null,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const { address } = useAccount();
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [recommendations, setRecommendations] = useState<Identity | null>(null);

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

  //Fetch IdentityData: followers following num
  const recommendationsData = useQuery(GET_RECOMMENDATIONS, {
    variables: {
      address: address,
    },
  }).data;

  useEffect(() => {
    if (recommendationsData) {
      setRecommendations(recommendationsData.recommendations);
    }
  }, [recommendationsData]);

  return (
    <Web3Context.Provider
      value={{
        address,
        identity,
        recommendations,
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
