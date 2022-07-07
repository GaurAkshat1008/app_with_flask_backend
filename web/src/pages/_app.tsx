import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider resetCSS theme={theme}>
    <Head>
      <title>Flask_app</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
