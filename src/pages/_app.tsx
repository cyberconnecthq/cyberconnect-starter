import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Web3ContextProvider } from '@/context/web3Context';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { chain, defaultChains } from 'wagmi';

const connectors = ({ chainId }: any) => {
  return [
    // new InjectedConnector({
    //   chains: defaultChains,
    //   // options: { shimDisconnect: true },
    // }),
    new WalletConnectConnector({
      options: {
        infuraId: 'd8759fe1122e4b19bdf7277a2771e1fb',
        qrcode: true,
      },
    }),
  ];
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Provider autoConnect connectors={connectors}>
        <Web3ContextProvider>
          <Component {...pageProps} />
        </Web3ContextProvider>
      </Provider>
    </StyledEngineProvider>
  );
}

export default MyApp;
