import mongoose from "mongoose";

const connectdb = async () =>{
try{
  const url =process.env.MONGODB_URI
  await mongoose.connect(url) 
    console.log("Database Conection succesfully")
}catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
}
export default connectdb