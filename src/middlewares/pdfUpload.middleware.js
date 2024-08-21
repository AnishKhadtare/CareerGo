import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF are allowed.'));
    }
};

const pdfUpload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 20 MB limit
    fileFilter: fileFilter,
});

export default pdfUpload;
