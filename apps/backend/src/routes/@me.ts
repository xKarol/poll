import express from "express";

import * as MeController from "../controllers/@me";
import { withPagination } from "../middlewares/with-pagination";

const router = express.Router();

router.get("/@me/poll", withPagination, MeController.GetPolls);

export default router;
