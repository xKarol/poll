import "./config/env";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { corsConfig } from "./config/cors";
import { errorHandler } from "./middlewares/error-handler";
import { withAuth } from "./middlewares/with-auth";
import routes from "./routes";
import { getOriginURL } from "./utils/get-origin-url";
import websocketInit from "./websockets";

const app = express();

app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(withAuth);
app.use(routes);
app.use(errorHandler);

const PORT = (process.env.PORT || 4000) as number;

const server = app.listen(PORT, () => {
  console.log(`Server is running at ${getOriginURL()}`);
});

websocketInit(server);

export default server;
