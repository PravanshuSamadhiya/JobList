import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRouter from "./routes/job.routes.js"
import connectDB from "./config/db.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Server is working!');
});

const PORT =  4000;

app.use("/api/jobs",jobRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`server running on port ${PORT}`);
})