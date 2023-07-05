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
      <div className="mainDiv">
        <Container className="authCont">
          <h5>For Job Seekers</h5>
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
      </div>
    ) : (
      <div className="mainDiv">
        <Container className="authCont">
          <h5>For Job Seekers</h5>
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
      </div>
    );
  };

  return (
    <>
      <div className="mainDiv">
        <img
          style={{
            margin: "1.5em",
            height: "120px",
            width: "180px",
          }}
          src="https://i.ibb.co/7NpG7dv/Career-Clash.png"
          alt="Logo"
        ></img>
        {displayForm()}
      </div>
    </>
  );
}
