import React from "react";
import { useState, useEffect} from "react";
import Name from "./Name"
import AboutMe from "./AboutMe";
import Headline from "./Headline"
import { Col, Container, Row, Button } from "reactstrap";
import {  useNavigate } from "react-router-dom";
import "./profile.css"


export default function Profile(props) {
  //const { id } = useParams();
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
    <>
      <div id="data">
      
      <div id="editButtons">
                <Button style={{backgroundColor: "#fd5f00"}} onClick={() => navigate("/jobPostings")}>Job Postings</Button>
                <Button style={{backgroundColor: "#fd5f00"}} onClick={() => navigate("/profileEdit")}>Edit Profile</Button>
      </div>
      <img
          style={{
            margin: "1.5em",
            height: "120px",
            width: "180px",
          }}
          src="https://i.ibb.co/7NpG7dv/Career-Clash.png"
          alt="Logo"
        ></img>
    <Container>
        <Row md="auto">
          <Col>
            <div className="content">
              <img id="profilePhoto" src="https://images.unsplash.com/photo-1642978277577-83c6ceac4820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80" alt="" />
            </div>
          </Col>
          
        </Row>
        <Col md="auto">
          <Col md="5">
            <div className="content">
            <div id="name">
                  <Col>
                    <Name firstName={user.firstName} lastName={user.lastName} token={props.token}/>
                  </Col>
                  
                </div>
            </div>
          </Col>
          <Col md="5">
              <div className="content">
                <div id="headline">   
                  <Col>
                    <Headline headline={user.headline} token={props.token}/>
                  </Col>
                </div> 
              </div>  
          </Col>
          <Col md="auto">
            <div className="content">
              <div id="aboutMe">
                  <Col>
                    <AboutMe aboutMe={user.aboutMe} token={props.token}/>
                  </Col>
                </div>
            </div>
            <Row></Row>
          </Col>
          
        </Col>
      </Container>
      </div>
    </>
  );
}



