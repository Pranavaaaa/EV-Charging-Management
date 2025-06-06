import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes.js";
import EvRoutes from "./routes/EvRoutes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

app.use(cors({
  origin: 'https://evconnect-v7v7.onrender.com',
  credentials: true
}));
app.use(bodyParser.json()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello From Server!");
});

app.use("/users", userRoutes);
app.use("/ev", EvRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  
});
