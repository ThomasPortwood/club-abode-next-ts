import * as React from "react";
import {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import {Error, Loading, useQueryWithStore} from 'react-admin';
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
import {useAuth0} from "@auth0/auth0-react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    propertyCard: {
      minWidth: 400
    },
    propertyCardTitle: {
      fontSize: 12
    },
  }),
);

export const OverviewProfile = () => {

  const {user} = useAuth0();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <img src={user.picture} alt="Profile" width={50}/>
      </Grid>
      <Grid item>
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
        <Button variant="outlined" size="small" className={classes.propertyCardTitle}>
          <Link to={`/properties/${property.id}`}>
            <Typography className={classes.propertyCardTitle}>
              History
            </Typography>
          </Link>
        </Button>
        <Button variant="outlined" size="small" className={classes.propertyCardTitle}>
          <Link to={`/properties/${property.id}/1`}>
            <Typography className={classes.propertyCardTitle}>
              Fixtures
            </Typography>
          </Link>
        </Button>
        <Button variant="outlined" size="small" className={classes.propertyCardTitle}>
          <Link to={`/properties/${property.id}/2`}>
            <Typography className={classes.propertyCardTitle}>
              Documents
            </Typography>
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
};


const Something = () => {

  const [events, setEvents] = useState([]);

  const {loaded, error} = useQueryWithStore(
    {
      type: 'getList',
      resource: 'events',
      payload: {filter: {}, sort: {field: "createdAt", order: "desc"}}
    },
    {
      onSuccess: ({data}: any) => {
        setEvents(data);
      }
    }
  );

  return (
    <Grid container>
      <Typography>Events</Typography>
      {events.map(t => <Event key={t.id} event={t}/>)}
    </Grid>
  )
}

const Event = ({event}: any) => {

  const interval = moment(event.createdAt).toNow(true);

  return (
    <Grid item xs={12}>
      <Divider/>
      <Typography variant="body2">
        {`${event.attributes.description} ${interval} ago`}
      </Typography>
    </Grid>
  );
}

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

        <Grid container spacing={5} item xs={12}>

          <Grid item md={8} xs={8}>
            <OverviewProfile/>
          </Grid>

          <Grid item md={4} xs={4}>
            <Button
              variant='outlined'
              onClick={() => history.push('/properties/create')}>New Property
            </Button>
          </Grid>

        </Grid>

        <Grid container spacing={5} item xs={12}>

          <Grid item md={8} xs={12}>
            <Grid container spacing={2} >
              {properties.map(p => (
                <Grid key={p.id} item>
                  <PropertyCard property={p}/>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item md={4} xs={12}>
            <Something/>
          </Grid>

        </Grid>

      </Grid>
    </div>
  )
};



