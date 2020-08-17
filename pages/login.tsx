import {useAuth} from 'use-auth0-hooks';
import React from "react";
import { useRouter } from 'next/router'
import Head from "next/head";

export default function Login() {

  const { pathname, query } = useRouter();

  const { isAuthenticated, isLoading, login, logout } = useAuth({
    audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    scope: 'read:properties'
  });

  console.log(logout);

  if (!isAuthenticated) {
    return (
      <button onClick={() => login({ appState: { returnTo: { pathname, query } } })}>
        Log in
      </button>
    );
  }

  if (isLoading) {
    return (
      <div>Loading your user information...</div>
    );
  }

  return (
    <div>
      <Head>
        <title>Logging in</title>
      </Head>
      You made it!
      <br/>
      <button onClick={() => logout({ returnTo: { pathname, query } })}>Log out</button>
    </div>
  );
}