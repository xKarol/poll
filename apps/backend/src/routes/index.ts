import express from "express";

import notFoundRoutes from "./404";
import meRoutes from "./@me";
import healthCheckRoute from "./health-check";
import pollRoutes from "./poll";

const router = express.Router();

router.use(healthCheckRoute);
router.use(meRoutes);
router.use(pollRoutes);
// must be the last
router.use(notFoundRoutes);

export default router;
