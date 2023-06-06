import React from "react";
import UserLogin from "./login/UserLogin";
import UserSignup from "./signup/UserSignup";

export default function Auth() {
  return (
    <>
      Auth
      <UserLogin />
      <UserSignup />
    </>
  );
}
