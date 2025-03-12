const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'hotel-booking', // Cloudinary folder name
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });
module.exports = upload;