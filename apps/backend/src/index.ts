import "./config/env";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { corsConfig } from "./config/cors";
import { errorHandler } from "./middlewares/error-handler";
import routes from "./routes";
import websocketInit from "./websockets";

const app = express();

app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const PORT = process.env["PORT"] || 4000;

const server = app.listen(PORT);

websocketInit(server);

console.log("app is running.");
