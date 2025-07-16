import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'] // Explicitly expose Set-Cookie header
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//connect to database
import connectDB from "./db/index";
connectDB();    

// routes
import authRouter from "./routes/auth.route";
import todoRouter from "./routes/todo.route";

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/todo",todoRouter);


export {app};