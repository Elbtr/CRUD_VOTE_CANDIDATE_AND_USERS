import DataURIParser from "datauri/parser";
import { Request } from "express";
import multer from "multer";
import path from "path";

// const storage = multer.diskStorage({
//     filename: function(req,file,cb){
//         cb(null, file.originalname)
//     }
// });
const dUri = new DataURIParser();

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

const dataUri = (req: Request) => {
  return dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
};
export { upload, dataUri };
