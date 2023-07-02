import React from "react";
import { useState, useEffect} from "react";
import Name from "./Name"
import AboutMe from "./AboutMe";
import Headline from "./Headline"
import { Col, Container, Row, Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import "./profile.css"
//import ProfileEdit from "./ProfileEdit";

export default function Profile(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ user, setUser ] = useState({});
    // Build the movie GET fetch here in index so movies can be passed to any child component
/*   const [ lastName, setProfileLastName ] = useState([]);
  const [ aboutMe, setProfileAboutMe ] = useState([]);
  const [ headline, setProfileHeadline ] = useState([]); */

  //----------------------------------------------

  const fetchUser = async () => {
      const url = `http://localhost:4000/user/profile`;
      //console.log(id);
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
    }
/*
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
*/
  
  // Use useEffect to run the fetch function to check for, and maintain our token.
  useEffect(() => {
    if (props.token) {
      fetchUser();
      /* fetchProfileLastName();
      fetchProfileHeadline();
      fetchProfileAboutMe(); */
    }
  }, [props.token])
//   {console.log(Rooms)}
  return (
    <div id="data">
    <>
      <Container>
         <Row>
         {/*  <Col md="4">
          </Col> */}
          <Col md="8"><Name firstName={user.firstName} token={props.token}/></Col>
          <Col md="8"><Name lastName={user.lastName} token={props.token}/></Col>
          <Col md="8"><Headline headline={user.headline} token={props.token}/></Col>
          <Col md="8"><AboutMe aboutMe={user.aboutMe} token={props.token}/></Col>
          
          <Button onClick={() => navigate("/profileEdit")}>Edit Profile</Button>
          {/* <ProfileEdit user = {user}/> */}
        </Row>
        <h1>Hello</h1>
      </Container>
    </>
    </div>
  );
}



