import React from 'react';
import { Button } from 'shards-react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

export const Heading = (props) => (
  <h2>Chicago Chat</h2>
)

export const Subhead = (props) => (
  <h4>The only city-wide chat for chicago natives</h4>
)

export const CallToAction = (props) => (
  <Link to = {ROUTES.SIGN_UP}><Button>Get Started</Button></Link>
)

const Hero = (props) => (
  <div className="hero-wrapper">
    <Heading></Heading>
    <Subhead></Subhead>
    <CallToAction></CallToAction>
  </div>
)

export default Hero