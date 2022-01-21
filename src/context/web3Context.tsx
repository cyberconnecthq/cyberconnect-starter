import React, { useState, useEffect, useContext, useCallback } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import CyberConnect from '@cyberlab/cyberconnect';

interface Web3ContextInterface {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  address: string;
  ens: string | null;
  cyberConnect: CyberConnect | null;
}

export const Web3Context = React.createContext<Web3ContextInterface>({
  connectWallet: async () => undefined,
  disconnectWallet: async () => undefined,
  address: '',
  ens: '',
  cyberConnect: null,
});

const infuraId = 'd8759fe1122e4b19bdf7277a2771e1fb';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: infuraId,
    },
  },
};

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [address, setAddress] = useState<string>('');
  const [ens, setEns] = useState<string | null>('');
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>(undefined);
  const [cyberConnect, setCyberConnect] = useState<CyberConnect | null>(null);

  async function getEnsByAddress(
    provider: ethers.providers.Web3Provider,
    address: string
  ) {
    const ens = await provider.lookupAddress(address);
    return ens;
  }

  const disconnectWallet = React.useCallback(async () => {
    setAddress('');
    setEns('');
  }, []);

  const subsribeProvider = React.useCallback(
    // @ts-ignore
    (provider: Web3Provider) => {
      provider.on('accountsChanged', (accounts: string[]) => {
        disconnectWallet();
      });

      // Subscribe to chainId change
      provider.on('chainChanged', (chainId: number) => {
        disconnectWallet();
        location.reload();
      });

      // Subscribe to provider connection
      provider.on('connect', (info: { chainId: number }) => {
        // logout();
      });

      // Subscribe to provider disconnection
      provider.on('disconnect', (error: { code: number; message: string }) => {
        disconnectWallet();
      });
    },
    [disconnectWallet]
  );

  const initCyberConnect = useCallback((provider: any) => {
    const cyberConnect = new CyberConnect({
      provider,
      namespace: 'CyberConnect',
    });

    setCyberConnect(cyberConnect);
  }, []);

  const connectWallet = React.useCallback(async () => {
    if (!web3Modal) {
      console.error('web3modal not initialized');
      throw 'web3modal not initialized';
    }
    try {
      const instance = await web3Modal.connect();

      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const ens = await getEnsByAddress(provider, address);

      setAddress(address);
      setEns(ens);
      subsribeProvider(provider);

      initCyberConnect(provider.provider);
    } catch (e) {
      disconnectWallet();
      throw e;
    }
  }, [web3Modal, disconnectWallet, subsribeProvider, initCyberConnect]);

  useEffect(() => {
    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });

    setWeb3Modal(web3Modal);
  }, []);

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        disconnectWallet,
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
