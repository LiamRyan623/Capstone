import { Form, FormGroup, Input, Button } from "reactstrap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSignup() {
  // We need to build out the handle submit function!

  // const firstNameRef = useRef();
  // const lastNameRef = useRef();
  // const emailRef = useRef();
  // const passwordRef = useRef();

  // const navigate = useNavigate();

  // async function handleSubmit(e) {
  //   // Stop the page from refreshing when the from submits
  //   e.preventDefault();
  //console.log("Testing signup from submit!");
  //console.log(firstNameRef.current.value);

  // const firstName = firstNameRef.current.value;
  // const lastName = lastNameRef.current.value;
  // const email = emailRef.current.value;
  // const password = passwordRef.current.value;

  // let body = JSON.stringify({
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  // });

  // packaging the url for the database
  // const url = "http://localhost:4005/user/signup";

  // const headers = new Headers();
  // headers.append("Content-Type", "application/json");

  // const requestOptions = {
  //   headers,
  //   body: body,
  //   method: "POST",
  // };
  // postman alternative but written in react method/raw json
  // try {
  //   const response = await fetch(url, requestOptions);
  //   const data = await response.json();
  //   if (data.message === "You're good to go signup completed!") {
  //     updateToken(data.token);
  //     navigate("/rooms");
  //   } else {
  //     alert(data.message);
  //   }
  // } catch (err) {
  //   console.error(err.message);
  //   // }
  // }
  return (
    <>
      <Form>
        <FormGroup>
          <Input placeholder="First Name" autoComplete={"off"} />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Last Name" autoComplete={"off"} />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Email" type="email" autoComplete={"off"} />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Password" type="password" autoComplete={"off"} />
        </FormGroup>
        <Button outline color="primary" block type="submit">
          Signup
        </Button>
      </Form>
    </>
  );
}
