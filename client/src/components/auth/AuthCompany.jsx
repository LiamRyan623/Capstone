import React, { useState } from "react";
import CompanyLogin from "./login/CompanyLogin";
import CompanySignup from "./signup/CompanySignup";
import { Col, Row, Container, Button, ButtonGroup } from "reactstrap";

export default function AuthCompany(props) {
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
            <CompanySignup updateToken={props.updateToken} />
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
            <CompanyLogin updateToken={props.updateToken} />
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

// Screw the class, change to small toggle function w/ onclick, cause conor hates me
