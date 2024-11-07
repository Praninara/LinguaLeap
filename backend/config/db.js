import mongoose from "mongoose";
//import dotenv from 'dotenv';

//dotenv.config();
const connectDB = async ()=>{
    //MONGO_URI = "mongodb+srv://narayanaudayagiri88:narayanaudayagiri88@cluster0.xfb8w.mongodb.net/";
    try{
        const conn = await mongoose.connect('mongodb+srv://narayanaudayagiri88:narayanaudayagiri88@cluster0.xfb8w.mongodb.net/synergy');
        console.log("mongo db connected");
    }catch(err){
        console.log(`Error connection and error msg : ${err}`);
        process.exit(1);
    }
}

export default connectDB;