import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Edit, ReferenceInput, SelectInput, SimpleForm, TextInput} from 'react-admin';
import {parse} from "query-string";
import Head from "next/head";

const FixtureTitle = ({record}: any) => {
  return <span>Fixture {record ? `"${record.name}"` : ''}</span>;
};

export const FixtureCreate = (props: any) => {
  const {propertyId} = parse(props.location.search);
  const redirect = propertyId ? `/properties/${propertyId}` : false;
  return (
    <div>
      <Head>
        <title>Add Fixture</title>
      </Head>
      <Create {...props}>
        <SimpleForm redirect={redirect}>
          <TextInput source="propertyId" initialValue={propertyId} disabled/>
          <TextInput source="name"/>
          <TextInput source="attributes" initialValue="{}"/>
        </SimpleForm>
      </Create>
    </div>
  )
};

export const FixtureEdit = (props: any) => (
  <div>
    <Head>
      <title>Edit Fixture</title>
    </Head>
    <Edit title={<FixtureTitle/>} {...props}>
      <SimpleForm>
        <ReferenceInput label="Property" source="propertyId" reference="properties">
          <SelectInput optionText="address"/>
        </ReferenceInput>
        <TextInput source="name"/>
        <TextInput source="attributes"/>
      </SimpleForm>
    </Edit>
  </div>
);