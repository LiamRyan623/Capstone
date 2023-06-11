import { Form, FormGroup, Input, Button } from "reactstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSignup({ updateToken }) {
  // We need to build out the handle submit function!

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    // Stop the page from refreshing when the from submits
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let body = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    });

    // packaging the url for the database
    const url = "http://localhost:4000/user/signup";

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      headers,
      body: body,
      method: "POST",
    };
    // postman alternative but written in react method/raw json
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.message === "Welcome to Career Clash!") {
        updateToken(data.token);
        // navigate("/rooms");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            placeholder="First Name"
            autoComplete={"off"}
            innerRef={firstNameRef}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Last Name"
            autoComplete={"off"}
            innerRef={lastNameRef}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Email"
            type="email"
            autoComplete={"off"}
            innerRef={emailRef}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Password"
            type="password"
            autoComplete={"off"}
            innerRef={passwordRef}
          />
        </FormGroup>
        <Button outline color="primary" block type="submit">
          Signup
        </Button>
      </Form>
    </>
  );
}
