import React, {cloneElement} from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {
  AutocompleteInput,
  Button,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  ExportButton,
  Filter,
  FormTab,
  List,
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
  sanitizeListRestProps,
  SimpleList,
  SimpleForm,
  TabbedForm,
  TextField,
  TextInput,
  TopToolbar,
  useListContext
} from 'react-admin';
import {Link, useHistory} from 'react-router-dom';
import IconAdd from '@material-ui/icons/Add';
import Head from "next/head";
import {Theme, useMediaQuery} from "@material-ui/core";

const OrganizationFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn/>
  </Filter>
);

const OrganizationListActions = (props: any) => {

  const history = useHistory();

  const {
    className,
    exporter,
    filters,
    maxResults,
    ...rest
  } = props;

  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    showFilter,
    total,
  } = useListContext();

  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters && cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: 'button',
      })}
      <Button
        onClick={() => history.push('organizations/create')}
        label="Create"
      >
        <IconAdd/>
      </Button>
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filterValues={filterValues}
        maxResults={maxResults}
      />
    </TopToolbar>
  );
};

export const OrganizationList = (props: any) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  return (
    <div>
      <Head>
        <title>All Organizations</title>
      </Head>
      <List actions={<OrganizationListActions/>} filters={<OrganizationFilter/>} {...props}>
        {isSmall ? (
          <SimpleList
            primaryText={(record: any) => record.name}
            secondaryText={(record: any) => record.createdAt}
            linkType={false}/>
        ) : (
          <Datagrid rowClick="edit">
            <TextField source="name"/>
            <ReferenceField label="Owner" source="ownerId" reference="members">
              <TextField source="name"/>
            </ReferenceField>
            <EditButton/>
          </Datagrid>
        )}
      </List>
    </div>
  )
};

export const OrganizationCreate = (props: any) => (
  <div>
    <Head>
      <title>Add Organization</title>
    </Head>
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name"/>
        <TextInput source="attributes" initialValue="{}"/>
      </SimpleForm>
    </Create>
  </div>
);

const AddOrganizationMemberButton = ({classes, record}: any) => {
  return (
    <Button
      variant="contained"
      component={Link}
      to={`/organizationMembers/create?organizationId=${record.id}`}
      label="Add Member"
    />
  )
};

export const OrganizationEdit = (props: any) => {
  const deleteRedirect = props.id ? `/organizations/${props.id}` : "/organizations";
  return (
    <div>
      <Head>
        <title>Edit Organization</title>
      </Head>
      <Edit {...props}>
        <TabbedForm redirect={false}>
          <FormTab label="Members">
            <ReferenceManyField
              reference="organizationMembers"
              target={`${props.basePath}/${props.id}/organizationMembers`}>
              <Datagrid>
                <ReferenceField source="memberId" reference="members">
                  <TextField source="name"/>
                </ReferenceField>
                <TextField label="Permission"/>
                <DeleteButton redirect={deleteRedirect}/>
              </Datagrid>
            </ReferenceManyField>
            <AddOrganizationMemberButton/>
          </FormTab>
          <FormTab label="Settings">
            <ReferenceInput
              label="Owner"
              source="ownerId"
              reference="members">
              <AutocompleteInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="name"/>
          </FormTab>
        </TabbedForm>
      </Edit>
    </div>
  )
};