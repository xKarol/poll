import "./config/env";
import { corsConfig } from "./config/cors";
import express from "express";
import routes from "./routes";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(routes);

const PORT = process.env["PORT"] || 4000;

app.listen(PORT);

console.log("app is running.");
