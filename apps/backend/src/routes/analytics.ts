import { apiUrls } from "@poll/config";
import express from "express";

import * as AnalyticsController from "../controllers/analytics";
import { requireAuth } from "../middlewares/require-auth";
import { withAnalyticsParams } from "../middlewares/with-analytics-params";

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
  withAnalyticsParams,
  AnalyticsController.GetUserPollVotesData
);

router.get(
  apiUrls.analytics.getUserPollTopDevices,
  requireAuth,
  withAnalyticsParams,
  AnalyticsController.GetUserPollTopDevicesData
);

router.get(
  apiUrls.analytics.getUserPollTopCountries,
  requireAuth,
  withAnalyticsParams,
  AnalyticsController.GetUserPollTopCountriesData
);

export default router;
