import React from 'react';
// https://github.com/sandrinodimattia/use-auth0-hooks
import {withAuth, withLoginRequired} from 'use-auth0-hooks';

function Profile({auth}) {

  const {user} = auth;

  return (
    <div>
      <h1>Profile</h1>
      <p>This is the profile page.</p>
      <pre>{JSON.stringify(user || {}, null, 2)}</pre>
    </div>
  );
}

// @ts-ignore
export default withLoginRequired(withAuth(Profile));