import "./config/env";

import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import favicon from "serve-favicon";

import { corsConfig } from "./config/cors";
import { errorHandler } from "./middlewares/error-handler";
import { withAuth } from "./middlewares/with-auth";
import routes from "./routes";
import { getOriginURL } from "./utils/get-origin-url";
import websocketInit from "./websockets";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.use(favicon(path.join(__dirname, "../public", "favicon.ico")));
app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use((req, res, next) => {
  if (req.originalUrl.includes("/webhook")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(withAuth);
app.use(routes);

app.use(errorHandler);

const PORT = (process.env.PORT || 4000) as number;

const server = app.listen(PORT, () => {
  console.log(`Server is running at ${getOriginURL()}`);
});

if (process.env.NODE_ENV !== "test") websocketInit(server); //TODO disabled in tests for now, fix later

export default server;
