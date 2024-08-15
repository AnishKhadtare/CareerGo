import mongoose from "mongoose";

const connectDb = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("MongoDb Connected HOST : ", connectionInstance.connection.host);
    }
    catch(error){
        console.error("MongoDb Connection failed !!!", error);
    }
}

export default connectDb;