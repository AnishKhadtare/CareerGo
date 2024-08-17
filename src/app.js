import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

import candidateRoutes from "./routes/candidate.routes.js";
import recruiterRoutes from "./routes/recruiter.routes.js";
import userRoutes from "./routes/user.routes.js";

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
app.use("/recruiter", recruiterRoutes);
app.use("/user", userRoutes);


export default app;