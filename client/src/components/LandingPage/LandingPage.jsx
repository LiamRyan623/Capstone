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
          className="leftCol"
          md="6"
          style={{
            backgroundColor: "#13334c",
            height: "100vh",
          }}
        >
          <Button id="buttonUser" onClick={() => navigate("/start")}>
            Career Clash for Individuals
          </Button>
        </Col>

        <Col
          className="rightCol"
          md="6"
          style={{
            backgroundColor: "#fd5f00",
            height: "100vh",
          }}
        >
          <Button id="buttonOrg" onClick={() => navigate("/companystart")}>
            Career Clash for Organizations
          </Button>
        </Col>
      </Row>
    </>
  );
}
