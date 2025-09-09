import mongoose from 'mongoose';
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI as string,{
        dbName:"Ecommerce",
        });
    console.log(`MongoDB Connected Successfully`);
    }catch(error){
        console.log("Not able to connect to MongoDB:", error);
        process.exit(1);
    };
    if(!process.env.MONGODB_URI){
        throw new Error("MONGO_URI is not defined in .env file");
    }
}
export default connectDB;