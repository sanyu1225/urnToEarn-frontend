import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import {
  AptosWalletAdapterProvider,
  NetworkName,
} from '@aptos-labs/wallet-adapter-react';
import { Client as UrqlClient, Provider as UrqlProvider, cacheExchange, fetchExchange } from 'urql';
import { BloctoWallet } from '@blocto/aptos-wallet-adapter-plugin';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
// import { createMuiTheme, ThemeProvier } from '@material-ui/core/styles';
import { ThemeProvider } from '@mui/material/styles';
import MuiTheme from '../muiTheme';
// import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';
import { ContextProvider } from '../context';
import { supportWebp } from '../utils';
import Mobile from '../component/Mobile';

const wallets = [
  new BloctoWallet({
    network: NetworkName.Testnet,
    bloctoAppId: '6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46',
  }),
  //   new FewchaWallet(),
  //   new MartianWallet(),
  //   new MSafeWalletAdapter(),
  //   new NightlyWallet(),
  //   new OpenBlockWallet(),
  //   new PontemWallet(),
  //   new RiseWallet(),
  //   new TokenPocketWallet(),
  //   new TrustWallet(),
  //   new WelldoneWallet(),
  new PetraWallet(),
];
const client = new UrqlClient({
  // TODO: set env file for graphql endpoint
  url: 'https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

export default function App({ Component, pageProps }) {
  const [isDesktop] = useMediaQuery('(min-width: 1024px)');
  const [isSupportWebp, setIsSupportWebp] = useState(true);

  useEffect(() => {
    setIsSupportWebp(supportWebp());
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Crypto | NFT | aptos"
        />
        <link rel="apple-touch-icon" href="/logo192.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <title>URN</title>
      </Head>
      <AptosWalletAdapterProvider
        plugins={wallets}
        autoConnect={false}
        onError={(error) => {
          console.log('Handle Error Message', error);
        }}
      >
        <ChakraProvider theme={theme}>
          <ContextProvider>
            <UrqlProvider value={client}>
              <ThemeProvider theme={MuiTheme}>
                {
                  isDesktop ? (
                    <>
                      {/* <CssBaseline /> */}
                      <Component isSupportWebp={isSupportWebp} {...pageProps} />
                    </>
                  ) : (
                    <Mobile />
                  )
                }
              </ThemeProvider>
            </UrqlProvider>
          </ContextProvider>
        </ChakraProvider>
      </AptosWalletAdapterProvider>
    </>
  );
}
