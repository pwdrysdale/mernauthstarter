const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extName = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extName && mimetype) {
    return cb(null, true);
  } else cb("Please upload an image of the format .jpg or .png");
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/api/auth/userPhoto", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = router;
