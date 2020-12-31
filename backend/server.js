const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes.js");
const fileUploadRoutes = require("./routes/fileUploadRoutes.js");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(morgan("dev"));

app.use(cookieParser());

app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

app.use("/", fileUploadRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
