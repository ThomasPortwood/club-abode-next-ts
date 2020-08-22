import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Edit, ReferenceInput, SelectInput, SimpleForm, TextInput} from 'react-admin';
import {parse} from "query-string";
import Head from "next/head";
import {getAttributeValue, setAttributeValue} from "../../lib/attributeUtilities";

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
      <SimpleForm redirect={false}>
        <ReferenceInput label="Property" source="parentId" reference="properties">
          <SelectInput optionText="name"/>
        </ReferenceInput>
        <TextInput source="name"/>
        <TextInput
          source="attributes"
          multiline
          resettable
          fullWidth
          format={(record: any) => getAttributeValue(record, 'text')}
          parse={(value: string) => setAttributeValue('text', value)}
          label="Text"/>
      </SimpleForm>
    </Edit>
  </div>
);