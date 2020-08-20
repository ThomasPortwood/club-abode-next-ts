import React from 'react';
import {Route} from 'react-router-dom';
import Head from "next/head";
// https://github.com/sandrinodimattia/use-auth0-hooks
import {useAuth, withLoginRequired} from 'use-auth0-hooks';
// https://nextjs.org/docs/basic-features/data-fetching
import {GetServerSideProps} from "next";
import {createMuiTheme} from "@material-ui/core/styles";
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
import {Admin, Loading, Resource} from "react-admin";
// mine:
import reactAdminHalDataProvider from "../lib/reactAdminHalDataProvider";
import Layout from "../components/admin/layout";
import {PropertyCreate, PropertyEdit, PropertyList} from "../components/admin/properties";
import {MemberList} from "../components/admin/members";
import {Overview} from "../components/admin/overview";
import {OrganizationCreate, OrganizationEdit, OrganizationList} from "../components/admin/organizations";
import {OrganizationMemberCreate} from "../components/admin/organizationMembers";
import {FixtureCreate, FixtureEdit} from "../components/admin/fixtures";
import {DocumentCreate, DocumentEdit} from "../components/admin/documents";
import MyMapbox from "../components/admin/map";

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

  // const {accessToken} = useAuth({
  //   audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
  //   scope:
  //     "read:fixtures " +
  //     "write:fixtures " +
  //     "read:verifications " +
  //     "write:verifications " +
  //     "read:properties " +
  //     "write:properties " +
  //     "read:documents " +
  //     "write:documents " +
  //     "read:records " +
  //     "write:records " +
  //     "read:organizations " +
  //     "write:organizations"
  // });

  // if (!accessToken) return (<Loading/>)
  //
  // const dataProvider = reactAdminHalDataProvider(accessToken);

  return (
    <div>
      Testing
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
// export default withLoginRequired(ReactAdmin);
export default ReactAdmin;