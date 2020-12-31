import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { registerUser } from "../actions/authActions";
import { Button } from "../componentsLibrary/Button";
import { Form, Input, FormGroup, Label } from "../componentsLibrary/Form";
import { Message } from "../componentsLibrary/Message";
import { H1 } from "../componentsLibrary/Headings";

const Register = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const authLogin = useSelector((state) => state.authLogin);
  const { user } = authLogin;

  const authRegister = useSelector((state) => state.authRegister);
  const { error: regError } = authRegister;

  const fileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        "Content-Type": "multipart/form-data",
      };

      const { data } = await axios.post(
        "/api/auth/userPhoto",
        formData,
        config
      );
      console.log(data);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        emailAddress,
        displayName,
        firstName,
        lastName,
        image: image ? image : "/uploads/default.png",
        password,
      })
    );
  };

  return (
    <div>
      {user && <Redirect to="/" />}
      <Form onSubmit={submitHandler}>
        <H1 center>Register</H1>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Input>{" "}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="userName">Username</Label>
          <Input
            id="userName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="emailAddress">Email Address</Label>
          <Input
            id="emailAddress"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="verifyPassword">Verify Password</Label>
          <Input
            id="verifyPassword"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            type="password"
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="fileUpload">Image Upload</Label>
          <Input type="file" id="fileUpload" onChange={fileHandler} />
        </FormGroup>
        {password.length < 8 && (
          <Message variant="warning">Your password needs to be longer</Message>
        )}
        {password !== verifyPassword && (
          <Message variant="warning">
            Your password and its verification do not match
          </Message>
        )}
        {uploading && (
          <Message variant="warning">
            Just give us a minute, we're upploading your image
          </Message>
        )}
        {regError && <Message variant="danger">{regError}</Message>}
        <Button
          type="submit"
          disabled={
            uploading || password.length < 8 || password !== verifyPassword
          }
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
