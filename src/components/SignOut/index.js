import React from 'react';
import { NavLink } from 'shards-react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <NavLink href="#" onClick={firebase.doSignOut}>
    Sign Out
  </NavLink>
);

export default withFirebase(SignOutButton);