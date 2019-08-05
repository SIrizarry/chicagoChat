import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import ChatPage from '../Chat';
import LandingPage from '../Landing';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.CHAT} component={ChatPage} />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
    </div>
  </Router>
)

export default withAuthentication(App);