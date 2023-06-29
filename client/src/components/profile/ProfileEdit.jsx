import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Col,
  Container,
  Input,
  Row,
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap";

export default function ProfileEdit(props) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const navigate = useNavigate();



  // Declare url outside fetches, same endpoint but different methods
  const url = `http://localhost:4000/user/profile`;

  // Build a fetch to our GET movie by id endpoint
  // Get movie details so we know what we need to change
  const fetchProfile = async () => {
    const url = `http://localhost:4000/user/profile`;
    console.log(id);
    const requestOptions = {
      method: 'GET',
      headers: new Headers({
        "Authorization": props.token
      })
    } 

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      console.log(data);
      setUser(data.locateUser);

    } catch (err) {
      console.log(err);
    }
  };
  // Use useEffect to make sure if the program reloads, we still get the movie
  useEffect(() => {
    if (props.token) {
      fetchProfile();
    }
  }, [props.token]);

  // Build handleSubmit for form with fetch: fetch to our PATCH endpoint
  async function handleSubmit(e) {
    e.preventDefault();

    // bodyObj is the req.body that the server needs for PATCH
    let bodyObj = JSON.stringify({
     name: profileName,
     aboutMe: profileAboutMe,
     headline: profileHeadline,
    });

    // Sending our token auth through headers, our bodyObj, and the method PATCH for the endpoint
    const requestOptions = {
      headers: new Headers({
        Authorization: props.token,
        "Content-Type": "application/json",
      }),
      body: bodyObj,
      method: "PATCH",
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      //console.log(data);
      // Use navigate on the button to go back to table view
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
        Edit Profile
      </h1>
      <Container>
        <Row>
          <Col md="4">
            <p>
              <b>{name}</b>:
              <br />{headline}
              {aboutMe}
              <br /> What needs to be changed?
            </p>
              <Button color="info" outline onClick={() => navigate(`/profile`)}>
                Back to Table
              </Button>
          </Col>
          <Col md="8">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                />
                </FormGroup>
              <FormGroup>
                <Label>Headline</Label>
                <Input
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  autoComplete="off"
                />
                 </FormGroup>
                <FormGroup>
                <Label>About Me</Label>
                <Input
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  autoComplete="off"
                />
              </FormGroup>
                <Button color="success">Update Profile</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
