import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Web3ContextProvider } from '@/context/web3Context';
import { StyledEngineProvider } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
