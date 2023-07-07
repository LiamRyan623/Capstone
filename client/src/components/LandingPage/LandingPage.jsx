import React from "react";
import { Container, Col, Row, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <Row className="mainRow">
        <Col md="6">
          <Button id="buttonUser" onClick={() => navigate("/start")}>
            Career Clash for Individuals
          </Button>
        </Col>

        <Col md="6">
          <Button id="buttonOrg" onClick={() => navigate("/companystart")}>
            Career Clash for Organizations
          </Button>
        </Col>
      </Row>
    </>
  );
}
