import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({                                             /* Adding the cloudinary configurations */
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,{
        resource_type: 'auto',
      },  // Explicitly set the resource_type to 'raw'
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
  });
};


export {uploadOnCloudinary}