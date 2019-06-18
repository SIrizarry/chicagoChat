import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {Form, FormInput, FormGroup, Container, Row, Col, Button } from 'shards-react';
import './styles.css';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <SignUpForm />
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  };

  onSubmit = (event) => {

    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    

    return (
      <Container className="signup-wrapper">
        <Row>
          <Col md="9" lg="9" className="signup-main"></Col>
          <Col md="3" lg="3" className="signup-sidebar">
            <h3>Get Started!</h3>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <label htmlFor="#username">Username</label>
                <FormInput
                  id="username"
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Full Name"
                />
              </FormGroup>
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
                <label htmlFor="#passwordOne">Password</label>
                <FormInput
                  id="passwordOne"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#passwordTwo">Confirm Password</label>
                <FormInput
                  id="passwordTwo"
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
                />
              </FormGroup>
              <Button theme="success" disabled={isInvalid} type="submit">Sign Up</Button>
              {error && <p>{error.message}</p>}
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
//Photo by Max Bender on Unsplash


const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase); // Learn how to do this with hooks. Recompose organizes higher order functions here. 

export default SignUpPage;

export { SignUpForm, SignUpLink }