import React, { useState, useEffect, useContext, useCallback } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import CyberConnect from '@cyberlab/cyberconnect';
import { useProvider, useContext as wUserContext, useConnect } from 'wagmi';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

interface Web3ContextInterface {
  connectWallet: () => Promise<void>;
  address: string;
  ens: string | null;
  cyberConnect: CyberConnect | null;
}

export const Web3Context = React.createContext<Web3ContextInterface>({
  connectWallet: async () => undefined,
  address: '',
  ens: '',
  cyberConnect: null,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [address, setAddress] = useState<string>('');
  const [ens, setEns] = useState<string | null>('');
  const [cyberConnect, setCyberConnect] = useState<CyberConnect | null>(null);
  // const provider = useProvider();
  const context = wUserContext();
  const [{ data, error }, connect] = useConnect();

  const connector = new WalletConnectConnector({
    options: {
      qrcode: true,
    },
  });

  // console.log(provider.prov[1].);

  async function getEnsByAddress(
    provider: ethers.providers.Web3Provider,
    address: string
  ) {
    const ens = await provider.lookupAddress(address);
    return ens;
  }

  const initCyberConnect = useCallback((provider: any) => {
    const cyberConnect = new CyberConnect({
      provider,
      namespace: 'CyberConnect',
    });

    setCyberConnect(cyberConnect);
  }, []);

  const connectWallet = React.useCallback(async () => {
    console.log(data.connectors);

    const mConnect = data.connectors[0];

    await connect(mConnect);

    const provider = mConnect.getProvider();
    // console.log(provider);
    console.log('wagmi provider: ', provider);
    const addr = await provider.enable();

    // const signer = provider1.signer;
    const address = addr[0];
    console.log('addr: ', addr);
    // const ens = await getEnsByAddress(provider1, address);

    setAddress(address);
    setEns(ens);
    initCyberConnect(provider);
  }, [initCyberConnect]);

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        address,
        ens,
        cyberConnect,
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
