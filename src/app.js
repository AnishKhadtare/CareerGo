import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

import candidateRoutes from "./routes/candidate.routes.js";

const app = express();

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/candidate", candidateRoutes);

export default app;