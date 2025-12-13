
import multer from "multer"

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'upload/')
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "mern-images",
//         allowed_formats: ["jpg", "jpeg", "png", "webp"],
//     },
// });

export const upload = multer({ storage })

