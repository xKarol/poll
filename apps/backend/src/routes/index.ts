import express from "express";

import notFoundRoutes from "./404";
import healthCheckRoute from "./health-check";
import pollRoutes from "./poll";

const router = express.Router();

router.use(healthCheckRoute);
router.use(pollRoutes);
// must be the last
router.use(notFoundRoutes);

export default router;
