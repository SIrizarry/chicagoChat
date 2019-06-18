import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse
} from "shards-react";
import './styles.css';


import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

// const Navigation = () => (
//   <div>
//     <AuthUserContext.Consumer>
//       {authUser => 
//         authUser ? <NavigationAuth /> : <NavigationNonAuth />
//       }
//     </AuthUserContext.Consumer>
//   </div>
// )

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => 
            authUser ? <NavigationAuth toggleNavbar = {this.toggleNavbar} collapseOpen = {this.state.collapseOpen}/> : <NavigationNonAuth toggleNavbar = {this.toggleNavbar} collapseOpen = {this.state.collapseOpen}/>
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const NavigationAuth = (props) => (
  <Navbar type="dark" theme="dark" expand="md">
    <Link to = {ROUTES.HOME}><NavbarBrand href="#">Chicago Chat</NavbarBrand></Link>
    <NavbarToggler onClick={props.toggleNavbar} />

    <Collapse open={props.collapseOpen} navbar>
      <Nav navbar>
        <NavItem>
          <Link to = {ROUTES.LANDING} ><NavLink href="/">Landing</NavLink></Link>
        </NavItem>
        <NavItem>
          <Link to = {ROUTES.HOME}><NavLink href="/home">Chat</NavLink></Link>
        </NavItem>
        <NavItem>
          <Link to = {ROUTES.ACCOUNT}><NavLink href="/account">Account</NavLink></Link>
        </NavItem>
        <NavItem>
          <SignOutButton />
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
)

const NavigationNonAuth = (props) => (
  <Navbar type="dark" theme="dark" expand="md">

  <Link to = {ROUTES.LANDING}><NavbarBrand href="#">Chicago Chat</NavbarBrand></Link>
    <NavbarToggler onClick={props.toggleNavbar} />
    <Collapse open= {props.collapseOpen} navbar>
      <Nav navbar>
        <NavItem>
          <Link to= {ROUTES.LANDING}><NavLink href="/">Landing</NavLink></Link>
        </NavItem>
        <NavItem>
          <Link to= {ROUTES.SIGN_IN}><NavLink href="/signin">Sign In</NavLink></Link>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
)

export default Navigation;