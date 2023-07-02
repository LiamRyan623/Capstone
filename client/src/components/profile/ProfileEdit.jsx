import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [headline, setHeadline] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [ user, setUser ] = useState({});
  const navigate = useNavigate();




  // Declare url outside fetches, same endpoint but different methods

  //const url = `http://localhost:4000/user/${id}`;
  //console.log("console logging ID", props.user)

  // Build a fetch to our GET movie by id endpoint
  // Get movie details so we know what we need to change
  // const fetchProfile = async () => {
  //   //const url = `http://localhost:4000/user/${id}`;
  //   console.log(id);
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: new Headers({
  //       "Authorization": props.token
  //     })
  //   } 

  //   try {
  //     const res = await fetch(url, requestOptions);
  //     const data = await res.json();
  //     console.log(data.locateUser);
  //     setUser(data.locateUser);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // Fetching user data without id = gives us access to info to populate the form AND an id to run the edit endpoint
  const fetchUser = async () => {
    const url = `http://localhost:4000/user/profile`;
    const requestOptions = {
      method: 'GET',
      headers: new Headers({
        "Authorization": props.token
      })
    } 

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      console.log(data.locateUser);
      setUser(data.locateUser);
      // set first name, set last name with state to edit/update name changes
      setFirstName(`${data.locateUser.firstName}`)
      setLastName(`${data.locateUser.lastName}`)
      setHeadline(`${data.locateUser.headline}`)
      setAboutMe(`${data.locateUser.aboutMe}`)
    } catch (err) {
      console.log(err);
    }
  }




  // Use useEffect to make sure if the program reloads, we still get the movie
  useEffect(() => {
    if (props.token) {
      fetchUser();
    }
  }, [props.token]);

  // Build handleSubmit for form with fetch: fetch to our PATCH endpoint <--- 
  async function handleSubmit(e) {
    e.preventDefault();

    // Build our URL
    const url = `http://localhost:4000/user/${user._id}`;
    console.log("user id",user._id);

    // bodyObj is the req.body that the server needs for PATCH
    // DB obj key on the left : on the right side have the current updated state; firstName: firstName
    let bodyObj = JSON.stringify({
     firstName: firstName,
     lastName: lastName,
     aboutMe: aboutMe,
     headline: headline,
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
      console.log(data);
      // data should have a yes message if it worked or a nah
      // Use navigate on the button to go back to table view
      navigate(-1);
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
          <Col md="8">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="off"
                />
                </FormGroup>
                <FormGroup>
                <Label>Last Name</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
