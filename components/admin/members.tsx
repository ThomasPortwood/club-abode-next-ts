import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {DateField, Datagrid, Filter, List, SimpleList, TextField, TextInput} from 'react-admin';
import {Theme, useMediaQuery} from "@material-ui/core";

export const MemberList = (props: any) => {

  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  return (
    <List {...props} filters={<MemberFilter/>} >
      {isSmall ? (
        <SimpleList
          primaryText={(record: any) => record.name}
          secondaryText={(record: any) => `Member since ${record.createdAt}`}
          linkType={false}/>
      ) : (
        <Datagrid>
          <TextField source="name"/>
          <DateField label="Member Since" source="createdAt" showTime/>
        </Datagrid>
      )}
    </List>
  )
};

const MemberFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Name/Email" source="name" alwaysOn/>
  </Filter>
);
