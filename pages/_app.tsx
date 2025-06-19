import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '../src/styles/theme';
import '@/styles/fonts.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Free Fortnite Lobby Bots - LOBBYMOM</title>
        <meta name="description" content="Get instant access to free Fortnite lobby bots! Copy bot names to invite them to your lobby. Refreshed every 30 seconds. Part of FNLB." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00C6FF" />
                {/* Inter font */}
        <link rel="preconnect" href="https://rsms.me" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://rsms.me/inter/inter.css"
        />
        {/* Fallback to Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        />
        
        {/* HeadingNowVariable */}
        <link
          rel="preload"
          href="https://lobby.mom/awso/css/f/HeadingNowVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Add all your other meta tags here */}
        <link rel="icon" href="https://lobby.mom/awso/assets/LOBBYMOM.png" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;