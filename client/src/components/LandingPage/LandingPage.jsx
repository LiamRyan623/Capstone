import React from "react";
import { Container, Col, Row, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <Row>
        <Col
          md="6"
          style={{
            backgroundColor: "#13334c",
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/cubes.png ')",
            height: "100vh",
          }}
        >
          <Button id="buttonUser" onClick={() => navigate("/start")}>
            Career Clash for Individuals
          </Button>
        </Col>

        <Col
          md="6"
          style={{
            backgroundColor: "#fd5f00",
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/cubes.png ')",
            height: "100vh",
          }}
        >
          <Button id="buttonOrg">Career Clash for Organizations</Button>
        </Col>
      </Row>
    </>
  );
}
