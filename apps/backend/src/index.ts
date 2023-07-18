import { corsConfig } from "./config/cors";
import "./config/env";
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

app.listen(3000);

console.log("app is running.");
