import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { passwordReset } from "../actions/authActions";
import { Form, FormGroup, Label, Input } from "../componentsLibrary/Form";
import { Button } from "../componentsLibrary/Button";
import { H1 } from "../componentsLibrary/Headings";
import { Message } from "../componentsLibrary/Message";
import { AUTH_RESET_RESET } from "../constants/authConstants";

const NewPassword = ({ match }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: AUTH_RESET_RESET });
  }, [dispatch]);

  const authReset = useSelector((state) => state.authReset);
  const { user: success, error, loading } = authReset;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(passwordReset({ emailAddress, password, _id: match.params.id }));
  };

  return (
    <>
      {success && <Redirect to="/" />}
      <H1>Reset Your Password</H1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label htmlFor="emailAddress">Email Address</Label>
          <Input
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            id="emailAddress"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">New Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="verifyPassword">Verify New Password</Label>
          <Input
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            id="verifyPassword"
            type="password"
          />
        </FormGroup>
        {password.length < 8 && (
          <Message variant="warning">Your password is not long enough</Message>
        )}
        {password !== verifyPassword && (
          <Message variant="warning">
            Password and its verification do not match
          </Message>
        )}
        {loading && <Message>Just loading...</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message>
            Great success! - Prepare to be moved on from here in a second!
          </Message>
        )}
        <Button
          type="submit"
          disabled={password.length < 8 || password !== verifyPassword}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NewPassword;
