import React, { useState } from "react";
import UserLogin from "./login/UserLogin";
import UserSignup from "./signup/UserSignup";
import { Col, Row, Container, Button, ButtonGroup } from "reactstrap";
import "./Auth.css";

export default function Auth(props) {
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
            <UserSignup updateToken={props.updateToken} />
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

      {displayForm()}
    </>
  );
}
