import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import pinoHttp from "pino-http";

import logger from "./shared/config/logger.js";
import healthRoutes from "./modules/health/health.routes.js";


const app = express();

app.use(pinoHttp({ logger }));

app.use(helmet());

app.use(compression());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/health", healthRoutes);

export default app;