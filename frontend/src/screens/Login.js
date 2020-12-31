import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { loginUser } from "../actions/authActions";
import { Form, FormGroup, Label, Input } from "../componentsLibrary/Form";
import { Button } from "../componentsLibrary/Button";
import { Message } from "../componentsLibrary/Message";
import { H1 } from "../componentsLibrary/Headings";
import { AUTH_LOGIN_RESET } from "../constants/authConstants";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const authLogin = useSelector((state) => state.authLogin);
  const { user, error } = authLogin;

  useEffect(() => {
    dispatch({ type: AUTH_LOGIN_RESET });
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ emailAddress, password }));
  };

  return (
    <div>
      {user && <Redirect to="/" />}
      <Form onSubmit={submitHandler}>
        <H1 center>Login</H1>
        <FormGroup>
          <Label for="emailAddress">Email Address</Label>
          <Input
            id="emailAddress"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          ></Input>
        </FormGroup>
        {error && <Message variant="danger">{error}</Message>}
        <Button type="submit">Log in</Button>
      </Form>
      <Link to="forgot">
        <Button>Forgot Password?</Button>
      </Link>
    </div>
  );
};

export default Login;
