import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Web3ContextProvider } from "../context/web3Context";

function MyApp({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.rinkeby, chain.arbitrum],
    [
      alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
      publicProvider(),
    ],
  );

  const { connectors } = getDefaultWallets({
    appName: "CyberConnect Starter V2",
    chains,
  });

  // create wagmi client
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  // create apollo client
  const CYBERCONNECT_ENDPOINT: string = "https://api.cybertino.io/connect/";

  const apolloClient = new ApolloClient({
    uri: CYBERCONNECT_ENDPOINT,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Web3ContextProvider>
            <Component {...pageProps} />
          </Web3ContextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default MyApp;
