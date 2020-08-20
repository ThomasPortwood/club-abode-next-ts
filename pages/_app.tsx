/**
 * https://nextjs.org/learn/basics/assets-metadata-css/global-styles
 * https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#3-protecting-a-route-in-a-nextjs-app-in-spa-mode
 */
import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import {Auth0Provider} from '@auth0/auth0-react';

const onRedirectCallback = (appState) => {
  // Use Next.js's Router.replace method to replace the url
  Router.replace(appState?.returnTo || '/');
};

class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
        redirectUri={typeof window !== 'undefined' && window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <Component {...pageProps} />
      </Auth0Provider>
    );
  }
}

export default MyApp;