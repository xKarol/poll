import express from "express";

import notFoundRoutes from "./404";
import healthCheckRoute from "./health-check";
import questionRoutes from "./question";

const router = express.Router();

router.use(healthCheckRoute);
router.use(notFoundRoutes);
router.use(questionRoutes);

export default router;
