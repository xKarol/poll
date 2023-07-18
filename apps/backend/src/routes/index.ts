import express from "express";

import notFoundRoutes from "./404";
import healthCheckRoute from "./health-check";
import pollRoutes from "./poll";

const router = express.Router();

router.use(healthCheckRoute);
router.use(notFoundRoutes);
router.use(pollRoutes);

export default router;
