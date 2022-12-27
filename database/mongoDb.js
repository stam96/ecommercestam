import mongoose from "mongoose";
//const uri = "mongodb://localhost:27017/dbecommerce"
const uri = process.env.DB_MONGO;
export const db = async ()=>{
    try {
        //New Line set db mongoose
        mongoose.set("strictQuery", true)
        const con = await mongoose.connect(uri);    
        console.log("Test correctamente " + con.connection.name )
    } catch (error) {
        console.log("error de conexion " + error.message)
    }
}