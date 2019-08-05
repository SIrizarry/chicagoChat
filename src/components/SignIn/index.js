import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {Form, FormInput, FormGroup, Container, Row, Col, Button } from 'shards-react';
import './styles.css';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component { 
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  };

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
     .doSignInWithEmailAndPassword(email, password)
     .then((response) => {
       console.log(response);
       this.setState({ ...INITIAL_STATE });
       this.props.history.push(ROUTES.CHAT);
     })
     .catch(error => {
       this.setState({ error })
     })

     event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name ]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return(
      <Container className="signin-wrapper">
        <Row>
          <Col md="9" lg="9" className="signin-main"></Col>
          <Col md="3" lg="3" className="signin-sidebar">
            <h3>Sign In</h3>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <label htmlFor="#email">Email</label>
                <FormInput
                  id="email"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#password">Password</label>
                <FormInput
                  id="password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />  
              </FormGroup>
              <Button theme="success" disabled={isInvalid} type="submit">
                Sign In
              </Button>
              <SignUpLink/>
              <PasswordForgetLink />

              {error && <p>{error.message}</p>}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm }