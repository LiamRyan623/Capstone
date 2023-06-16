import React, { useEffect } from "react";
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
            height: "100vh",
          }}
        >
          <Button
            className="buttonUser"
            onClick={() => navigate("/start")}
            outline
          >
            Career Clash for Individuals
          </Button>
        </Col>

        <Col
          md="6"
          style={{
            backgroundColor: "#fd5f00",
            height: "100vh",
          }}
        >
          <Button className="buttonOrg" outline>
            Career Clash for Organizations
          </Button>
        </Col>
      </Row>
    </>
  );
}
