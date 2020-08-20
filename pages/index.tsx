import React from 'react';
// https://github.com/sandrinodimattia/use-auth0-hooks
import {useAuth} from 'use-auth0-hooks';
// https://nextjs.org/docs/basic-features/data-fetching
import {GetServerSideProps} from "next";
import {createMuiTheme} from "@material-ui/core/styles";
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
import {Loading} from "react-admin";
// mine:

// https://material-ui.com/customization/typography/
// https://material-ui.com/customization/breakpoints/
const myTheme = createMuiTheme();
myTheme.typography.h4 = {
  fontSize: '1.0rem',
  [myTheme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
  [myTheme.breakpoints.up('lg')]: {
    fontSize: '2.0rem',
  }
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      testing: "here"
    }
  }
};

function ReactAdmin({testing}) {

  const {accessToken, login, logout} = useAuth({
    audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    scope:
      "read:fixtures " +
      "write:fixtures " +
      "read:verifications " +
      "write:verifications " +
      "read:properties " +
      "write:properties " +
      "read:documents " +
      "write:documents " +
      "read:records " +
      "write:records " +
      "read:organizations " +
      "write:organizations"
  });

  if (!accessToken) return (
    <div>
      Not logged in.
      <button onClick={() => login({appState: {returnTo: 'http://localhost:3000'}})}>Log in</button>
    </div>
  );

  //
  // const dataProvider = reactAdminHalDataProvider(accessToken);

  return (
    <div>
      Testing
      <button onClick={() => logout({returnTo: 'http://localhost:3000'})}>Log out</button>
      {/*<Admin*/}
      {/*  title="Club Abode"*/}
      {/*  dataProvider={dataProvider}*/}
      {/*  dashboard={Overview}*/}
      {/*  layout={Layout}*/}
      {/*  theme={myTheme}*/}
      {/*  customRoutes={[*/}
      {/*    <Route key="map" path="/map" component={MyMapbox}/>*/}
      {/*  ]}*/}
      {/*>*/}
      {/*  <Resource name="documents" create={DocumentCreate} edit={DocumentEdit}/>*/}
      {/*  <Resource name="fixtures" create={FixtureCreate} edit={FixtureEdit}/>*/}
      {/*  <Resource name="organizations" list={OrganizationList} create={OrganizationCreate} edit={OrganizationEdit}/>*/}
      {/*  <Resource name="organizationMembers" create={OrganizationMemberCreate}/>*/}
      {/*  <Resource name="properties" list={PropertyList} create={PropertyCreate} edit={PropertyEdit}/>*/}
      {/*  <Resource name="members" list={MemberList}/>*/}
      {/*</Admin>*/}
    </div>
  );
}

// @ts-ignore
export default ReactAdmin;
