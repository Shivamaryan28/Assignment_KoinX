import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from "./database/db_connection.js";
import cryptoRouter from "./routes/cryptoRoutes.js"


const app = express();
const PORT = process.env.PORT || 3000;

connectDB()


app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({"status":"working"})
});
app.use("/api/v1/",cryptoRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});