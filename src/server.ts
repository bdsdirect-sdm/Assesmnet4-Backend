
import express from "express"
import { dbconnect } from "./config/dbconnect";
import app from "./index"

dbconnect();

app.listen(4400, ()=>{
    console.log("Server is running on port 4400")
})




export default app;