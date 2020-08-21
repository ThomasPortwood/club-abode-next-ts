import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Edit, FileField, FileInput, ReferenceInput, SelectInput, SimpleForm, TextInput} from 'react-admin';
import {Typography} from '@material-ui/core';
import {parse} from "query-string";
import Head from "next/head";

export const RecordCreate = (props: any) => {
  const {propertyId} = parse(props.location.search);
  const redirect = propertyId ? `/properties/${propertyId}/1` : false;
  return (
    <div>
      <Head>
        <title>New Record</title>
      </Head>
      <Create {...props}>
        <SimpleForm redirect={redirect}>
          <TextInput source="parentId" initialValue={propertyId} disabled/>
          <TextInput source="name"/>
          <TextInput source="attributes" initialValue="{}"/>
        </SimpleForm>
      </Create>
    </div>
  );
};

export const RecordEdit = (props: any) => (
  <div>
    <Head>
      <title>Edit Record</title>
    </Head>
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput label="Property" source="parentId" reference="properties">
          <SelectInput optionText="name"/>
        </ReferenceInput>
        <TextInput source="name"/>
        <TextInput source="attributes"/>
      </SimpleForm>
    </Edit>
  </div>
);