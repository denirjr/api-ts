"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (_, file, callBack) => {
        callBack(null, 'uploads/');
    },
    filename: (_, file, callBack) => {
        callBack(null, file.originalname);
    }
});
const uploads = multer({ storage: storage });
exports.default = uploads;
