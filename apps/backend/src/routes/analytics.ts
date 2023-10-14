import { apiUrls } from "@poll/config";
import express from "express";

import * as AnalyticsController from "../controllers/analytics";
import { requireAuth } from "../middlewares/require-auth";

// import { validateSchema } from "../middlewares/validate-schema";
// import * as AnalyticsSchema from "../schemas/analytics";

const router = express.Router();

// router.get(
//   "/analytics/poll/:pollId",
//   requireAuth,
//   validateSchema(AnalyticsSchema.getPollData),
//   AnalyticsController.GetPollData
// );

router.get(
  apiUrls.analytics.userPollVotes,
  requireAuth,
  AnalyticsController.GetUserPollVotesData
);

export default router;
