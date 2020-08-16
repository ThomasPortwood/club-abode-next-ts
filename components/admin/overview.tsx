import * as React from "react";
import {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import {Error, Loading, useQueryWithStore} from 'react-admin';
import {useAuth} from "use-auth0-hooks";
import moment from 'moment';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  Grid,
  Theme,
  Typography
} from '@material-ui/core';
import Head from "next/head";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    propertyCard: {
      minWidth: 300
    },
    propertyCardTitle: {
      fontSize: 12
    },
  }),
);

export const OverviewProfile = () => {

  const {user} = useAuth();

  return (
    <Grid container spacing={2}>
      <Grid item xs='auto'>
        <img src={user.picture} alt="Profile" width={50}/>
      </Grid>
      <Grid item xs='auto'>
        <Typography variant="h4">{user.name}</Typography>
        <Typography>{user.email}</Typography>
      </Grid>
    </Grid>
  );
};

export const PropertyCard = ({property}: any) => {

  const classes = useStyles();

  const interval = moment(property.updatedAt).toNow(true);

  return (
    <Card elevation={5} className={classes.propertyCard}>
      <CardHeader
        avatar={
          <Avatar>
            {property.name[0]}
          </Avatar>
        }
        title={property.name}
        subheader={`Updated ${interval} ago`}
      />
      <CardContent>
        <Typography>
          {property.address}
        </Typography>
      </CardContent>
      <Divider light={true}/>
      <CardActions>
        <Button size="small" className={classes.propertyCardTitle}>
          <Link to={`/properties/${property.id}`}>
            <Typography className={classes.propertyCardTitle}>
              Details
            </Typography>
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
};

export const Overview = () => {

  const history = useHistory();
  const [properties, setProperties] = useState<any []>([]);

  const {loaded, error} = useQueryWithStore(
    {
      type: 'getList',
      resource: 'properties',
      payload: {filter: {}, sort: {field: "updatedAt", order: "desc"}}
    },
    {
      onSuccess: ({data}: any) => {
        setProperties(data);
      }
    }
  );

  if (!loaded) {
    return <Loading/>;
  }
  if (error) {
    return <Error/>;
  }

  return (
    <div>
      <Head>
        <title>Overview</title>
      </Head>
      <Grid container spacing={2} justify="center">
        <Grid container spacing={2} justify="center" item xs={12}>
          <Grid item xs={6}>
            <OverviewProfile/>
          </Grid>
          <Grid item xs='auto'>
            <Button
              variant='outlined'
              onClick={() => history.push('/properties/create')}>New Property
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="center" item xs={12}>
          <Grid item lg={8} xs='auto'>
            <Grid container spacing={2} justify="center">
              {properties.map(p => (
                <Grid key={p.id} item>
                  <PropertyCard property={p}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs='auto'>
            Recent Activity (coming soon)
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
};



