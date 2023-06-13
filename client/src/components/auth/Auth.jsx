import React from "react";
import UserLogin from "./login/UserLogin";
import UserSignup from "./signup/UserSignup";
import { Nav, NavItem, NavLink, Col, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Auth(props) {
  return (
    <>
      <Col md="6">
        <Nav justified pills tabs>
          <NavItem>
            <NavLink>Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink active>Signup</NavLink>
          </NavItem>
        </Nav>

        <UserSignup updateToken={props.updateToken} />
        <UserLogin updateToken={props.updateToken} />
      </Col>
    </>
  );
}
