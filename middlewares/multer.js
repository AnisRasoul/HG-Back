const multer = require("multer");

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Export the upload middleware for handling multiple images
module.exports = upload.array('images', 10); // You can also export the upload instance if you need it elsewhere
