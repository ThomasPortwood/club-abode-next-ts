/**
 * https://nextjs.org/learn/basics/assets-metadata-css/global-styles
 */
import { AppProps } from 'next/app'
import '../styles/global.css'
import React from "react";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App;