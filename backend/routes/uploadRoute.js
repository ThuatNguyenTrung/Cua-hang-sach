import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|jpg|png/;
  const mimetypes = /image\/jpe?g|image\/jpg|image\/png/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (mimetypes.test(mimetype) && filetypes.test(extname)) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!", false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});
const uploadSingleImage = upload.single("image");

router.post("/", uploadSingleImage, (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Vui lòng chọn hình ảnh!");
    }
    res.status(200).json({
      message: "Đã tải lên hình ảnh!",
      image: `/${req.file.path}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

export default router;
