import { apiUrls } from "@poll/config";
import express from "express";

import * as AnalyticsController from "../controllers/analytics";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";
import { withAnalyticsParams } from "../middlewares/with-analytics-params";
import * as AnalyticsSchema from "../schemas/analytics";

const router = express.Router();

router.get(
  apiUrls.analytics.userPollVotes,
  requireAuth,
  validateSchema(AnalyticsSchema.pollQueryParams),
  withAnalyticsParams,
  AnalyticsController.GetUserPollVotesData
);

router.get(
  apiUrls.analytics.getUserPollTopDevices,
  requireAuth,
  validateSchema(AnalyticsSchema.pollQueryParams),
  withAnalyticsParams,
  AnalyticsController.GetUserPollTopDevicesData
);

router.get(
  apiUrls.analytics.getUserPollTopCountries,
  requireAuth,
  validateSchema(AnalyticsSchema.pollQueryParams),
  withAnalyticsParams,
  AnalyticsController.GetUserPollTopCountriesData
);

export default router;
