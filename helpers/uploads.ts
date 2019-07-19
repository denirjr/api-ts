import * as multer from 'multer';

const storage = multer.diskStorage({
    destination: (_, file, callBack) => {
        callBack(null, 'uploads/');
    },
    filename: (_, file, callBack) => {
        callBack(null, file.originalname);
    }
});

const uploads = multer({ storage: storage });

export default uploads;
