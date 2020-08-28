import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-dom';
// https://github.com/auth0/auth0-react
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';
// https://nextjs.org/docs/basic-features/data-fetching
import {GetServerSideProps} from "next";
// https://marmelab.com/react-admin/Tutorial.html
import {Admin, Resource} from "react-admin";
import {createMuiTheme} from "@material-ui/core/styles";
// mine:
import reactAdminHalDataProvider from "../lib/reactAdminHalDataProvider";
import Layout from "../components/admin/layout";
import {Overview} from "../components/admin/overview";
import MyMapbox from "../components/admin/map";
import {DocumentCreate, DocumentEdit} from "../components/admin/documents";
import {FixtureCreate, FixtureEdit} from "../components/admin/fixtures";
import {OrganizationCreate, OrganizationEdit, OrganizationList} from "../components/admin/organizations";
import {OrganizationMemberCreate} from "../components/admin/organizationMembers";
import {PropertyCreate, PropertyEdit, PropertyList} from "../components/admin/properties";
import {MemberList} from "../components/admin/members";
import Head from "next/head";
import {RecordCreate, RecordEdit} from "../components/admin/records";

// https://material-ui.com/customization/typography/
// https://material-ui.com/customization/breakpoints/
const myTheme = createMuiTheme();
myTheme.typography.h4 = {
  fontSize: '1.0rem',
  fontFamily: 'roboto',
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

  const {getAccessTokenSilently} = useAuth0();

  const [dataProvider, setDataProvider] = useState<any>();

  useEffect(() => {

    (async () => {

      const options = {
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
      }

      const accessToken = await getAccessTokenSilently(options);

      setDataProvider(reactAdminHalDataProvider(accessToken));

    })();

  }, [getAccessTokenSilently])

  if (!dataProvider) return (<div>Creating data provider ...</div>);

  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Admin
        title="Club Abode"
        dataProvider={dataProvider}
        dashboard={Overview}
        layout={Layout}
        theme={myTheme}
        customRoutes={[
          <Route key="map" path="/map" component={MyMapbox}/>
        ]}
      >
        <Resource name="documents" create={DocumentCreate} edit={DocumentEdit}/>
        <Resource name="events"/>
        <Resource name="fixtures" create={FixtureCreate} edit={FixtureEdit}/>
        <Resource name="organizations" list={OrganizationList} create={OrganizationCreate} edit={OrganizationEdit}/>
        <Resource name="organizationMembers" create={OrganizationMemberCreate}/>
        <Resource name="properties" list={PropertyList} create={PropertyCreate} edit={PropertyEdit}/>
        <Resource name="members" list={MemberList}/>
        <Resource name="records" create={RecordCreate} edit={RecordEdit}/>
      </Admin>
    </div>
  );
}

// @ts-ignore
export default withAuthenticationRequired(ReactAdmin, {
  onRedirecting: () => <div>Going to login ...</div>,
});