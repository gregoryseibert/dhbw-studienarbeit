import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { CssBaseline, withStyles } from '@material-ui/core';

import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import BunMaster from './pages/BunMaster';
import BunDetail from './pages/BunDetail';
import BunCreate from './pages/BunCreate';
import BunEdit from './pages/BunEdit';
import LoafMaster from './pages/LoafMaster';
import LoafDetail from './pages/LoafDetail';
import LoafCreate from './pages/LoafCreate';
import LoafEdit from './pages/LoafEdit';
import IngredientMaster from './pages/IngredientMaster';
import IngredientCreate from './pages/IngredientCreate';
import IngredientEdit from './pages/IngredientEdit';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  main: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

const menuAuthenticated = [
  {
    name: "Home",
    path: "/"
  }, {
    name: "Buns",
    path: "/bun"
  }, {
    name: "Loafs",
    path: "/loaf"
  }, {
    name: "Ingredients",
    path: "/ingredient"
  }, {
    name: "Logout",
    path: "/logout"
  }
]

const menuPublic = [
  {
    name: "Home",
    path: "/"
  }, {
    name: "Login",
    path: "/login"
  }
]

class App extends Component {
  constructor(props) {
    super(props)

    const persistedTokenExists = (sessionStorage.getItem('jwtToken') != null);

    this.state = {
      menu: persistedTokenExists ? menuAuthenticated : menuPublic,
      isLoggedIn: persistedTokenExists
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>
          <CssBaseline />
          <NavigationBar menu={this.state.menu} />
          <main className={classes.main}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />

              <Route exact path="/bun" render={(props) => (
                 this.state.isLoggedIn === true ?
                    <BunMaster {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
              )} />
              <Route exact path="/bun/view/:id" render={(props) => (
                 this.state.isLoggedIn === true ?
                    <BunDetail {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
              )} />
              <Route exact path="/bun/create" render={(props) => (
                 this.state.isLoggedIn === true ?
                    <BunCreate {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
              )} />
              <Route exact path="/bun/edit/:id" render={(props) => (
                 this.state.isLoggedIn === true ?
                    <BunEdit {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
              )} />

              <Route exact path="/loaf" render={(props) => (
                 this.state.isLoggedIn === true ?
                    <LoafMaster {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
              )} />
              <Route exact path="/loaf/view/:id" render={(props) => (
                 this.state.isLoggedIn === true ?
                    <LoafDetail {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
              )} />
              <Route exact path="/loaf/create" render={(props) => (
                 this.state.isLoggedIn === true ?
                    <LoafCreate {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
              )} />
              <Route exact path="/loaf/edit/:id" render={(props) => (
                 this.state.isLoggedIn === true ?
                    <LoafEdit {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
              )} />

              <Route exact path="/ingredient" render={(props) => (
                 this.state.isLoggedIn === true ?
                    <IngredientMaster {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
              )} />
              <Route exact path="/ingredient/create" render={(props) => (
                 this.state.isLoggedIn === true ?
                    <IngredientCreate {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
              )} />
              <Route exact path="/ingredient/edit/:id" render={(props) => (
                 this.state.isLoggedIn === true ?
                    <IngredientEdit {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
              )} />
            </Switch>
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
