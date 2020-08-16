import React from "react";
import {Create, Datagrid, EditButton, List, SimpleForm, TextField, TextInput} from "react-admin";

export const PropertyList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <EditButton/>
    </Datagrid>
  </List>
);

export const PropertyCreate = (props: any) => {
  const redirect = `/properties`;
  return (
    <Create {...props}>
      <SimpleForm redirect={redirect}>
        <TextInput source="name"/>
        <TextInput source="address"/>
        <TextInput source="attributes" initialValue="{}"/>
      </SimpleForm>
    </Create>
  )
};