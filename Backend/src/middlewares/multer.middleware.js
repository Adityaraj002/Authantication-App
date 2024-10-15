import multer from "multer";

const upload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const multerUpload= multer({storage: upload})

const singleAvatar = multerUpload.single('profile');
const attachmentMulter = multerUpload.array("profile", 5);

export { singleAvatar, attachmentMulter,upload }

