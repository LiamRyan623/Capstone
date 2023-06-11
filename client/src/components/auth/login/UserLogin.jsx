import { useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   //console.log(emailRef.current.value);

  //   // Build the body object for server endpoint
  //   let body = JSON.stringify({
  //     email: emailRef.current.value,
  //     password: passwordRef.current.value,
  //   });
  //   // Declare and init our url
  //   const url = "http://localhost:4005/user/login";

  //   try {
  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: new Headers({
  //         "Content-Type": "application/json",
  //       }),
  //       body: body,
  //     });
  //     const data = await res.json();

  //     if (data.message === "Login Successful!") {
  //       updateToken(data.token);
  //       navigate("/rooms");
  //     } else {
  //       alert(data.message);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Form>
        <FormGroup>
          <Input
            placeholder="Email"
            innerRef={emailRef}
            type="email"
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Password"
            innerRef={passwordRef}
            type="password"
            autoComplete="off"
          />
        </FormGroup>
        <Button
          outline
          color="primary"
          style={{ float: "right" }}
          type="submit"
          block
        >
          Login
        </Button>
      </Form>
    </>
  );
}
