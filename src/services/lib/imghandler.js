import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "marketplace",
  },
});

function addimage(req, res, next) {
  const upload = multer({ storage: cloudinaryStorage }).single("image");
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      throw new Error(err);
    } else {
      next();
    }
  });
}

export default addimage