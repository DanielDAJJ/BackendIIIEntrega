import path from "path";
import __dirname from "./index.js";
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        let folder = 'general';
        if(file.fieldname === 'petImage') folder = 'pets';
        if(file.fieldname === 'userDocument') folder = 'documents';

        const uploadPath = path.join(__dirname, '..', 'public', folder);

        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath, {recursive: true});
        }
        cb(null, uploadPath)
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({storage})

export default uploader;