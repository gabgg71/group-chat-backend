const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");



cloudinary.config({
  cloud_name: process.env.CLOUD,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "AppAuth",
      }
  })

const upload = multer({
    storage,
}).single('image')

module.exports = upload;