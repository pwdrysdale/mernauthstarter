const Users = require("../models/Users");
const ResetRequest = require("../models/ResetRequest");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");
const jwt = require("jsonwebtoken");

// Create a new user
// POST /api/auth/
// Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    emailAddress,
    displayName,
    firstName,
    lastName,
    image,
    password,
  } = req.body;
  const userExists = await Users.findOne({ emailAddress });
  const userNameExists = await Users.findOne({ displayName });

  if (userExists) {
    res.status(400);
    throw new Error("A user with that email address already exists");
  }

  if (userNameExists) {
    res.status(400);
    throw new Error("A user with that user name already exists");
  }

  // Hash the password
  let hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await Users.create({
    emailAddress,
    displayName,
    firstName,
    lastName,
    image,
    password: hashedPassword,
  });

  if (createdUser) {
    const token = generateToken(createdUser._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });
    res.status(201).json({
      _id: createdUser._id,
      emailAddress: createdUser.emailAddress,
      displayName: createdUser.displayName,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      image: createdUser.image,
      type: createdUser.type,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Log a user in
// POST /api/auth/login
// Public
const loginUser = asyncHandler(async (req, res) => {
  const { emailAddress, password } = req.body;

  const user = await Users.findOne({ emailAddress });

  if (!user) {
    res.status(401).json({ message: "The user does not exist!" });
    throw new Error("The user does not exist!");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });
    res.status(200).json({
      _id: user._id,
      emailAddress: user.emailAddress,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      type: user.type,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid password" });
    throw new Error("Invalid password");
  }
});

//@desc   Log a user out
//@route  GET /api/auth/login
//@access Public
const logOut = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1, httpOnly: true, sameSite: "strict" });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500);
    throw new Error("Could not log the user out - server error");
  }
});

//@desc   Update a users profile
//@route  PUT /api/auth/:id
//@access Private
const updateSelf = asyncHandler(async (req, res) => {
  const {
    emailAddress,
    displayName,
    firstName,
    lastName,
    image,
    password,
    type,
  } = req.body;
  const _id = req.params.id;

  const user = await Users.findById(_id);
  console.log(user);

  if (!user) {
    res.status(404);
    throw new Error("Can't find that user!");
  }

  if (user.emailAddress !== emailAddress) {
    res.status(401);
    throw new Error("You are not authorized to do that!");
  }

  let hashedPassword = await bcrypt.hash(password, 10);

  if (user) {
    user.displayName = displayName;
    user.firstName = firstName;
    user.lastName = lastName;
    user.image = image;
    user.type = type ? type : user.type;
    user.password = hashedPassword;

    const updatedUser = await user.save();
    const token = generateToken(updatedUser._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });

    res.status(201).json({
      emailAddress: updatedUser.emailAddress,
      displayName: updatedUser.displayName,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      image: updatedUser.image,
      type: updatedUser.type,
      _id: updatedUser._id,
      token,
    });
  } else {
    res.status(500);
    throw new Error("Server error");
  }
});

//@desc   Delete a user
//@route  DELETE /api/auth/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  await Users.findByIdAndDelete(_id);
  res.status(200).json({ message: "User deleted" });
});

//@desc   Generate a reset request
//@route  POST /api/auth/reset
//@access Public
const resetRequest = asyncHandler(async (req, res) => {
  //NOTE: Build error handling for not finding a user
  try {
    const { emailAddress } = req.body;
    const user = await Users.findOne({ emailAddress });
    if (user) {
      const request = await ResetRequest.create({
        emailAddress,
        userId: user._id,
      });
      console.log(request);

      // Email service config
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Message config
      const mailOptions = {
        to: emailAddress,
        subject: "Password reset request!",
        text: `To reset your password, please click the link: http://localhost:3000/reset/${request._id}`,
      };

      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          res.status(500);
          throw new Error("Server error");
        } else {
          res.status(200).send({ message: "Message sent!" });
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//@desc   Reset a users password
//@route  POST /api/auth/reset/:id
//@access Public
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const requestId = req.params.id;
    const { emailAddress, password } = req.body;

    const request = await ResetRequest.findById(requestId);

    if (request.emailAddress === emailAddress) {
      const user = await Users.findById(request.userId);
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      const updatedUser = await user.save();
      console.log(updatedUser);

      const token = generateToken(updatedUser._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 3,
      });

      res.status(200).json({
        emailAddress: updatedUser.emailAddress,
        displayName: updatedUser.displayName,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        image: updatedUser.image,
        _id: updatedUser._id,
        type: updatedUser.type,
        token,
      });
    } else {
      res.status(404).json({ message: "Resource not found" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

//@desc   Check if a user is out and about
//@route  GET /api/users/
//@access Public
const checkUser = asyncHandler(async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (decoded.id) {
        try {
          const user = await Users.findById(decoded.id);

          if (user) {
            res.status(200).json({
              emailAddress: user.emailAddress,
              displayName: user.displayName,
              firstName: user.firstName,
              lastName: user.lastName,
              image: user.image,
              _id: user._id,
              type: user.type,
              token,
            });
          } else {
            res.status(404);
            throw new Error("User does not exist");
          }
        } catch (error) {
          res.status(404);
          throw new Error("User does not exist");
        }
      } else {
        res.status(404);
        throw new Error(error);
      }
    });
  } else {
    res.status(404);
  }

  //res.json(cookies.jwt);
});

module.exports = {
  registerUser,
  loginUser,
  logOut,
  updateSelf,
  deleteUser,
  resetRequest,
  resetPassword,
  checkUser,
};
