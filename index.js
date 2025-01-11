import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from "./database/db_connection.js";
import cryptoRouter from "./routes/cryptoRoutes.js"
import {initCron} from "./utils/cron.js";


const app = express();
const PORT = process.env.PORT || 3000;

//connecting database
connectDB();
//initializing cron job
initCron();


app.use(express.json());

//Health Route
app.get("/",(req,res)=>{
    res.status(200).json({"status":"working"})
});
app.use("/api/v1/",cryptoRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});