/**
 * https://nextjs.org/learn/basics/assets-metadata-css/global-styles
 * https://github.com/sandrinodimattia/use-auth0-hooks
 */
import { AppProps } from 'next/app'
import '../styles/global.css'
import React from "react";
import {Auth0Provider} from "use-auth0-hooks";

export default ({
                  Component,
                  pageProps
}: AppProps) => {
  return <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    redirectUri={'http://localhost:3000'}>
    <Component {...pageProps} />
  </Auth0Provider>
}