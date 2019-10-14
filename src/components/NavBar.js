import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  Button,
  Form,
  FormGroup
} from "reactstrap";
import { Link } from "react-router-dom";

const buttonStyle = {
  backgroundColor: "#f95959",
  color: "white",
  borderColor: "#f95959"
};

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <Link to="/">
          <img
            alt=""
            src="../rainbow128.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Bubblegram
        </Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Type username"
                />
              </FormGroup>
              <Button style={buttonStyle}>Submit</Button>
            </Form>
            <NavItem>
              <Link to="/users/1">Users</Link>
            </NavItem>
            <NavItem>
              <NavLink href="#">Sign In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Sign Up</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
