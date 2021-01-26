import React from 'react';

import { AuthUserContext, withAuthentication } from './Session';
import { withRouter } from 'react-router-dom';

import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import useStyles from './theme.dashboard';

import Calendar from './Calendar';

function Dashboard(props) {
  let match = useRouteMatch();

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const signOut = () => {
    props.firebase.auth.signOut()
    props.history.push("/");
  }

  return (
        <AuthUserContext.Consumer>
        {
        authUser => authUser ? (
            <div className={classes.root}>
                <CssBaseline />

                <main className={classes.content, !open ? classes.contentClosed : classes.appBarShift }>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    <Calendar 
                        firebase={props.firebase}
                        authUser={authUser}
                    />
              
                </Container>
                </main>
                
            </div>
            ) : (
            <p>Not authorized.</p>
         )
      }
    </AuthUserContext.Consumer>
  );
};

export default withRouter(withAuthentication(Dashboard));
