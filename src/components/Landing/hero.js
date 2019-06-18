import React from 'react';
import { Button } from 'shards-react';
import { Link } from 'react-router-dom';
import './styles.css';

import * as ROUTES from '../../constants/routes';

export const Heading = (props) => (
  <h2>Chicago Chat</h2>
)

export const Subhead = (props) => (
  <h4>The only city-wide chat for chicago natives</h4>
)

export const CallToAction = (props) => (
  <div className="button-wrapper">
    <Link to = {ROUTES.SIGN_UP}><Button>Get Started</Button></Link>
    <Link to = {ROUTES.SIGN_IN}><Button>Sign In</Button></Link>
  </div>
)

const Hero = (props) => (
  <div className="hero-wrapper">
    <Heading></Heading>
    <Subhead></Subhead>
    <CallToAction></CallToAction>
  </div>
)

export default Hero