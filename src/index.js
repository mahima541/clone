
import mongoose from "mongoose";
// import express from "express";
import dotenv from "dotenv"
import {app} from './app.js'

import { connectDB } from "./db/index.js";

// import {DB_NAME} from "./constants";
// import  {DB_NAME}  from "./constants.js";

dotenv.config({
    path: './.env'
})

// import express from "express";
// const app = express()


// const hello = async() =>{

//     try{
//     //  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//      await mongoose.connect(`mongodb://localhost:27017/info`)
//      console.log("connected to db");

//      app.on("error", (error) =>{
//         console.log("ERROR: ", error);
//         throw err
//      })
//      app.listen(process.env.PORT, () =>{
//         console.log(`app is listening on ${process.env.PORT}`);
//      })
//     }catch(error){
//         console.error("error: ", error);
//         throw err
//     }

// }
// hello();

const startServer = async () => {
    try {
        await connectDB();

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
            })
            
        }catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit the process if unable to start server
    }
};

startServer();