const cloudinary = require("cloudinary").v2
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'upload/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '_' + file.originalname)
//     }
// })

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "mern-images",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

const upload = multer({ storage: storage })

module.exports = { cloudinary, upload }