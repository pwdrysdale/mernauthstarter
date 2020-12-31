import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createResetRequest } from "../actions/authActions";
import { Form, Input, FormGroup, Label } from "../componentsLibrary/Form";
import { H1 } from "../componentsLibrary/Headings";
import { Button } from "../componentsLibrary/Button";
import { Message } from "../componentsLibrary/Message";
import { AUTH_REQUEST_RESET_RESET } from "../constants/authConstants";

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState("");

  const dispatch = useDispatch();

  const authRequestReset = useSelector((state) => state.authRequestReset);
  const { loading, error, success } = authRequestReset;

  useEffect(() => {
    dispatch({ type: AUTH_REQUEST_RESET_RESET });
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createResetRequest(emailAddress));
  };

  return (
    <>
      <H1>Forgot Your Password</H1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label htmlFor="emailAddress">Email Address</Label>
          <Input
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </FormGroup>
        {loading && <Message>Having a think about it...</Message>}
        {success && (
          <Message>
            We have sent you an email with a link to reset your password -
            hurry, it only lasts 24 hours!
          </Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default ForgotPassword;
