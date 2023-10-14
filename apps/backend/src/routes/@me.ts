import { apiUrls } from "@poll/config";
import express from "express";

import * as MeController from "../controllers/@me";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";
import { withPagination } from "../middlewares/with-pagination";
import * as UserSchema from "../schemas/user";

const router = express.Router();

router.patch(
  apiUrls.user.update,
  validateSchema(UserSchema.updateUser),
  requireAuth,
  MeController.UpdateData
);

router.delete(apiUrls.user.delete, requireAuth, MeController.DeleteUser);

router.get(
  apiUrls.user.getVotes,
  requireAuth,
  withPagination,
  MeController.GetUserVotes
);

router.get(
  apiUrls.user.getPolls,
  requireAuth,
  withPagination,
  MeController.GetPolls
);

export default router;
