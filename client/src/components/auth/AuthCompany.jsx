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
    ) : (
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
    );
  };

  return (
    <>
      <img
        style={{
          margin: "1.5em",
          height: "120px",
          width: "180px",
        }}
        src="https://lh3.googleusercontent.com/pw/AJFCJaXDKlTXrBTuCqsY3J3mDaljKPIYRX8W0bUkByB5DhcKSzSKfsdHumSFOXqt2D2EYqauV6u09WlBoTPrL--zrwny5kRSuvlML-QbA9KPbFq2w6x3fRtyhr2Ue_l--Ye6TWmylWcdnxkFMsy-XGRI9FFS4O68Msf9OV3Htgqcr2D0_U2jeG8fOd8jhNwfSz8JCrYuLj_n9N-YkMCXvhFf1x3ObU-eEMUS8RrhBMkkddXG0i970o1CVdU89saxFEBMQKGJCbBsEld9C7HyHLoWqLJxMDqZB8EpwP7jYl5y2hzmj74fwg3FZvQbpBTTU5FjhsuT8i7VN79bpzbTmMyVRxsGIL-2Gadj3XJs8usPR-M3M3zeK78SXXZ0ODcgcyQjN3OczMOUUJzJnN-s_ltCQisyaH_GiAA-Yp0zRQuK-E8EqxNm70JgXNnpwR_lAVDp1kMpdxDouXHiuYvuonLSBnjtUPKT0KtiMS09C5Gqh_Rz9c5lQnJvsqZvufUnAEQZdwA1-FFTyC79wJvv6SctRQUvKee-iLTqfzioqFB88y2JfcMIz0jl7dO7SrgbgdKiPQy9-fUeSVG4qXW-YL_4tuAoWiFKAIDvs8QeQsEBeinn4RF2XmdGoVoP-AomVH00Kt-okSAFrIHvWXfZGDOZ6WvgML6K-0Nb4dHUJxh5tLjGDcpLy9nCDsUXokyQ5gkhN4kV6d8uidJVr-vLYzTr849r1HBPLIONpBTPnB_iSb2h_r6WGLpWPgXwIwhx8PcxpKC5mkUqWLt0RGqcYpu63vKCn68xNDHXnIZbUsrRub9vOUF5Krqjm-Q-my451W5M4bM0Diht3TZmdgRUO0dR-Tt0ya6mZGz6g0s03Gnj8EdZO4X1zmlrS8nLit4E2KAxAbZtbRKE3D-KwQQpH078RP_tAg=w480-h330-s-no?authuser=0"
        alt="Logo"
      ></img>
      {displayForm()}
    </>
  );
}

// Screw the class, change to small toggle function w/ onclick, cause conor hates me
