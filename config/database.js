import mongoose from "mongoose";

const connectdb = async () =>{
try{
  const url ="mongodb+srv://abutt042_db_user:Demonbutt12@cluster0.6rw4cft.mongodb.net/Expressjspractice?appName=Cluster0"
  await mongoose.connect(url) 
    console.log("Database Conection succesfully")
}catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
}
export default connectdb