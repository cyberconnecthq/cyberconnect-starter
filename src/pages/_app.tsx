import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '@/components';
import { Web3ContextProvider } from '@/context/web3Context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <Header />
      <Component {...pageProps} />
    </Web3ContextProvider>
  );
}

export default MyApp;
