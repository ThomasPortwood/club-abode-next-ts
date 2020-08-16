import React from 'react';
// https://github.com/sandrinodimattia/use-auth0-hooks
import {useAuth, withLoginRequired} from 'use-auth0-hooks';
// https://nextjs.org/docs/basic-features/data-fetching
import {GetServerSideProps} from "next";
import {createMuiTheme} from "@material-ui/core/styles";
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
import {Admin, Loading, Resource} from "react-admin";
import reactAdminHalDataProvider from "../lib/reactAdminHalDataProvider";
import Layout from "../components/admin/layout";
import {PropertyList} from "../components/admin/properties";
import {MemberList} from "../components/admin/members";

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

  const {accessToken} = useAuth({
    audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    scope: 'read:properties'
  });

  if (!accessToken) return (<Loading/>)

  const dataProvider = reactAdminHalDataProvider(accessToken);

  return (
    <Admin title="Club Abode" dataProvider={dataProvider} layout={Layout} theme={myTheme}>
      <Resource name="properties" list={PropertyList}/>
      <Resource name="members" list={MemberList}/>
    </Admin>
  );
}

// @ts-ignore
export default withLoginRequired(ReactAdmin);