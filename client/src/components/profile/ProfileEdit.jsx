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
import FullButton from "../buttons/FullButton";

export default function ProfileEdit(props) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const navigate = useNavigate();



  // Declare url outside fetches, same endpoint but different methods
  const url = `http://localhost:4000/profile/${id}`;

  // Build a fetch to our GET movie by id endpoint
  // Get movie details so we know what we need to change
  const fetchProfile = async () => {
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      //console.log(data);
      // Dive into data from the fetch with obj deconstruction
      const { name, aboutMe, headline, } = data.getProfile;

      // Set the base state movie values with that data, movie data pre-patching
      setName(name);
      setAboutMe(aboutMe);
      setHeadline(headline);
    } catch (error) {
      console.error(error);
    }
  };
  // Use useEffect to make sure if the program reloads, we still get the movie
  useEffect(() => {
    if (props.token) {
      fetchMovies();
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
        Edit Movie
      </h1>
      <Container>
        <Row>
          <Col md="4">
            <p>
              <b>{movieTitle}</b>:
              <br />A {movieGenre} movie rated {movieRating} that runs{" "}
              {movieLength}
              minutes was released in {movieReleased}.
              <br /> What needs to be changed?
            </p>
            <FullButton>
              <Button color="info" outline onClick={() => navigate(`/movie`)}>
                Back to Table
              </Button>
            </FullButton>
          </Col>
          <Col md="8">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  value={movieTitle}
                  onChange={(e) => setMovieTitle(e.target.value)}
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                <Label>Genre</Label>
                <Input
                  value={movieGenre}
                  onChange={(e) => setMovieGenre(e.target.value)}
                  type="select"
                  autoComplete="off"
                >
                  {genre.map((g, i) => (
                    <option key={i} value={g}>
                      {g}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Rating</Label>
                <Input
                  value={movieRating}
                  onChange={(e) => setMovieRating(e.target.value)}
                  type="select"
                  autoComplete="off"
                >
                  {ratings.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Length</Label>
                <Input
                  value={movieLength}
                  onChange={(e) => setMovieLength(e.target.value)}
                  type="number"
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                <Label>Release Year</Label>
                {yearRange()}
              </FormGroup>
              <FullButton>
                <Button color="success">Update Movie</Button>
              </FullButton>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
