import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({                                             /* Adding the cloudinary configurations */
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath)  return null;
        const response = await cloudinary.uploader.upload(localFilePath, {          /* Uploading files to cloudinary */
            resource_type: "auto"
        });
        fs.unlinkSync(localFilePath);
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export {uploadOnCloudinary}