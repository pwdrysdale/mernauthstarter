const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/Users");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Users.findById(decoded.id).select("-password");
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("You are not authorized to do that!");
  }
  next();
});

module.exports = { protect };
