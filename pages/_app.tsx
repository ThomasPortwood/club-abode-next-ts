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

  const redirect = process.env.NEXT_PUBLIC_AUTH0_REDIRECT + '/admin';

  return <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT}>
    <Component {...pageProps} />
  </Auth0Provider>
}