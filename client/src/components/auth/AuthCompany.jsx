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
      <div className="mainDiv">
        <Container className="authCont">
          <h5>For Organizations</h5>
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
      </div>
    ) : (
      <div className="mainDiv">
        <Container className="authCont">
          <h5>For Organizations</h5>
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

// Screw the class, change to small toggle function w/ onclick, cause conor hates me
