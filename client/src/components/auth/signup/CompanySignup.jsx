import { Form, FormGroup, Input, Button } from "reactstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanySignup({ updateToken }) {
  // We need to build out the handle submit function!

  const companyRef = useRef();
  console.log(companyRef);
  const emailRef = useRef();
  console.log(emailRef);
  const passwordRef = useRef();
  console.log(passwordRef);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    // Stop the page from refreshing when the from submits
    e.preventDefault();

    const company = companyRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let body = JSON.stringify({
      company,
      email,
      password,
    });

    // packaging the url for the database
    const url = "http://localhost:4000/comp/signupComp";

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
        navigate("/profile");
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
            placeholder="Company"
            autoComplete={"off"}
            innerRef={companyRef}
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
        <Button outline block type="submit">
          Signup
        </Button>
      </Form>
    </>
  );
}
