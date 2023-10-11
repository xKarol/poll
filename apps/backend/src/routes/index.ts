import express from "express";

import notFoundRoutes from "./404";
import meRoutes from "./@me";
import analytics from "./analytics";
import healthCheckRoute from "./health-check";
import paymentsRoutes from "./payments";
import pollRoutes from "./poll";
import webhooks from "./webhooks";

const router = express.Router();

router.use(healthCheckRoute);
router.use(paymentsRoutes);
router.use(meRoutes);
router.use(pollRoutes);
router.use(analytics);
router.use(webhooks);
// must be the last
router.use(notFoundRoutes);

export default router;
