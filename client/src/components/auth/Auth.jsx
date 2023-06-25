import React, { useState } from "react";
import UserLogin from "./login/UserLogin";
import UserSignup from "./signup/UserSignup";
import { Col, Row, Container, Button, ButtonGroup } from "reactstrap";

export default function Auth(props) {
  const [auth, setAuth] = useState("Signup");

  const swapForm = () => {
    auth === "Login" ? setAuth("Signup") : setAuth("Login");
  };

  const displayForm = () => {
    return auth === "Signup" ? (
      <Container>
        <Col>
          <Button onClick={swapForm}>Login</Button>

          <Button disabled>Signup</Button>
        </Col>
        <Row
          style={{
            margin: "1em",
            justifyContent: "center",
          }}
        >
          <Col md="4">
            <UserSignup updateToken={props.updateToken} />
          </Col>
        </Row>
      </Container>
    ) : (
      <Container>
        <Col>
          <Button disabled>Login</Button>

          <Button onClick={swapForm}>Signup</Button>
        </Col>
        <Row style={{ margin: "1em", justifyContent: "center" }}>
          <Col md="4">
            <UserLogin updateToken={props.updateToken} />
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      <h1
        style={{
          margin: ".5em",
          color: "#13334c",
        }}
      >
        Career Clash
      </h1>
      <h5 style={{ margin: "1em", color: "white" }}>or</h5>

      {displayForm()}
    </>
  );
}
