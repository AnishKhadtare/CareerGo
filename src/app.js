import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import cookieSession from "cookie-session";
import bodyParser from "body-parser";

import candidateRoutes from "./routes/candidate.routes.js";
import recruiterRoutes from "./routes/recruiter.routes.js";
import userRoutes from "./routes/user.routes.js";
import googleAuthRoutes from "./routes/google.auth.routes.js";

import passport from 'passport';
import './config/passport.js'; 

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
app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['cyberwolve'],
  maxAge: 24 * 60 * 60 * 100,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/candidate", candidateRoutes);
app.use("/recruiter", recruiterRoutes);
app.use("/user", userRoutes);
app.use("/auth", googleAuthRoutes);



export default app;