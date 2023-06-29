import React, { useState } from "react";
import CompanyLogin from "./login/CompanyLogin";
import CompanySignup from "./signup/CompanySignup";
import { Col, Row, Container, Button, ButtonGroup } from "reactstrap";
import "./Auth.css";

export default function AuthCompany(props) {
  const [auth, setAuth] = useState("Signup");

  const swapForm = () => {
    auth === "Login" ? setAuth("Signup") : setAuth("Login");
  };

  const displayForm = () => {
    return auth === "Signup" ? (
      <Container className="authCont">
        <ButtonGroup className="bGroup">
          <Button className="lsTog" onClick={swapForm}>
            Login
          </Button>

          <Button className="lsTog" disabled>
            Signup
          </Button>
        </ButtonGroup>
        <Row>
          <Col>
            <CompanySignup updateToken={props.updateToken} />
          </Col>
        </Row>
      </Container>
    ) : (
      <Container className="authCont">
        <ButtonGroup className="bGroup">
          <Button className="lsTog" disabled>
            Login
          </Button>

          <Button className="lsTog" onClick={swapForm}>
            Signup
          </Button>
        </ButtonGroup>
        <Row>
          <Col>
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

      {displayForm()}
    </>
  );
}

// Screw the class, change to small toggle function w/ onclick, cause conor hates me
