import React from "react";
import { useState, useEffect} from "react";
import Name from "./Name"
import AboutMe from "./AboutMe";
import Headline from "./Headline"
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";

export default function Profile(props) {
  const { id } = useParams();
  const [ firstName, setProfileFirstName ] = useState([]);
    // Build the movie GET fetch here in index so movies can be passed to any child component
  const [ lastName, setProfileLastName ] = useState([]);
  const [ aboutMe, setProfileAboutMe ] = useState([]);
  const [ headline, setProfileHeadline ] = useState([]);

  //----------------------------------------------

  const fetchProfileFirstName = async () => {
      const url = `http://localhost:4117/user/${id}`;
      const requestOptions = {
        method: 'GET',
        headers: new Headers({
          "Authorization": props.token
        })
      } 

      try {
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        // console.log(data);
        setProfileFirstName(data.getOneProfile);

      } catch (err) {
        console.log(err);
      }
    }

    //---------------------------------

  const fetchProfileHeadline = async () => {
    const url = `http://localhost:4117/user/${id}`;
    const requestOptions = {
      method: 'GET',
      headers: new Headers({
        "Authorization": props.token
      })
    } 

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      // console.log(data);
      setProfileHeadline(data.getOneProfile);

    } catch (err) {
      console.log(err);
    }
  }

  //-------------------------------

  const fetchProfileLastName = async () => {
    const url = `http://localhost:4117/user/${id}`;
    const requestOptions = {
      method: 'GET',
      headers: new Headers({
        "Authorization": props.token
      })
    } 

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      // console.log(data);
      setProfileLastName(data.getOneProfile);

    } catch (err) {
      console.log(err);
    }
  }

  //-----------------------------

  const fetchProfileAboutMe = async () => {
    const url = `http://localhost:4117/user/${id}`;
    const requestOptions = {
      method: 'GET',
      headers: new Headers({
        "Authorization": props.token
      })
    } 

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      // console.log(data);
      setProfileAboutMe(data.getOneProfile);

    } catch (err) {
      console.log(err);
    }
  }

  
  // Use useEffect to run the fetch function to check for, and maintain our token.
  useEffect(() => {
    if (props.token) {
      fetchProfileFirstName();
      fetchProfileLastName();
      fetchProfileHeadline();
      fetchProfileAboutMe();
    }
  }, [props.token])

//   {console.log(Rooms)}
  return (
    <>
      <Container>
        <Row>
          <Col md="4">
            {/* <RoomCreate token={props.token} fetchRooms={fetchRooms}/> */}
          </Col>
          <Col md="8"><Name firstName={firstName} token={props.token} fetchProfile={fetchProfileFirstName}/></Col>
          <Col md="8"><Name lastName={lastName} token={props.token} fetchProfile={fetchProfileLastName}/></Col>
          <Col md="8"><AboutMe aboutMe={aboutMe} token={props.token} fetchProfile={fetchProfileAboutMe}/></Col>
          <Col md="8"><Headline headline={headline} token={props.token} fetchProfile={fetchProfileHeadline}/></Col>
        </Row>
      </Container>
    </>
  );
}



