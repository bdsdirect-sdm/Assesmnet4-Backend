import express from "express"
import cors from "cors"
import { config } from "dotenv"
import routes from "./routes"
import path from "path"
import exp from "constants"


const app = express()

config();
app.use(cors({
    origin:"*"
}))
app.use(express.json());
app.use('/upload', express.static(path.join(__dirname,'../upload')));
app.use("/api/v1",routes);

app.get('/',(req,res) =>{
    res.send(`<h1>Your app is running on port ${process.env.PORT}</h1>`)
})

export default app;