import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import pinoHttp from "pino-http";

import logger from "./shared/config/logger.js";
import authRoutes from "./modules/auth/auth.routes.js";
import departmentRoutes from "./modules/departments/department.routes.js"
import patientRoutes from "./modules/patients/patients.routes.js"
import doctorRoutes from "./modules/doctor/doctor.routes.js"
import errorMiddleware from "./shared/middleware/error.middleware.js";


const app = express();

app.use(pinoHttp({ logger }));

app.use(helmet());

app.use(compression());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/doctors", doctorRoutes);

export default app;