import express from "express";

import * as MeController from "../controllers/@me";
import { requireAuth } from "../middlewares/require-auth";
import { withPagination } from "../middlewares/with-pagination";

const router = express.Router();

router.get("/@me/poll", requireAuth, withPagination, MeController.GetPolls);

export default router;
