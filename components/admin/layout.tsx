import * as React from 'react';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Head from "next/head";
import {makeStyles, Theme, ThemeProvider} from '@material-ui/core/styles';
//@ts-ignore
import {Notification} from 'react-admin';
import {Button, Divider, Grid, Tab, Tabs, Toolbar, Typography} from "@material-ui/core";
import {useAuth} from "use-auth0-hooks";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    color: 'transparent'
  },
  title: {
    flexGrow: 1,
  },
  tab: {
    minWidth: '10%',
    textTransform: 'none'
  }
}));

const tabs = [
  {index: 0, label: "Overview", key: "/"},
  {index: 1, label: "Map", key: "/map"},
  {index: 2, label: "Properties", key: "/properties"},
  {index: 3, label: "People", key: "/members"},
  {index: 4, label: "Organizations", key: "/organizations"}
]

interface LayoutProps {
  children: any[],
  theme: Theme,
  title: string
}

const Layout = ({children, theme, title}: LayoutProps) => {

  const {logout} = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    history.push(tabs[newValue].key);
  };

  console.log(children);

  return (
    <ThemeProvider theme={theme}>
      <Head>Something</Head>
      <div className={classes.root}>

        <Grid container justify="center" spacing={2}>

          <Grid item md={10} xs={12}>
            <Toolbar>
              <Typography className={classes.title}>{title}</Typography>
              <Button variant="outlined" color="inherit"
                      onClick={() => logout({returnTo: 'http://localhost:3000'})}>Logout</Button>
            </Toolbar>
          </Grid>

          <Grid item xs={10}>
            <Tabs
              centered
              variant="fullWidth"
              value={value}
              onChange={handleTabChange}>
              {tabs.map(t => (<Tab className={classes.tab} {...t}/>))}
            </Tabs>
            <Divider light={true}/>
          </Grid>

          <Grid item xs={10}>
            {children}
          </Grid>

        </Grid>

        <Notification/>
      </div>
    </ThemeProvider>
  );
};

export default Layout;