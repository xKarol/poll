import { apiUrls } from "@poll/config";
import type { User } from "@poll/types";
import express from "express";

import * as MeController from "../controllers/@me";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";
import { withPagination } from "../middlewares/with-pagination";
import { withSorting } from "../middlewares/with-sorting";
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
  withSorting<User.SortVotesFields>({
    allowedFields: ["createdAt"],
    defaultField: "createdAt",
  }),
  MeController.GetUserVotes
);

router.get(
  apiUrls.user.getPolls,
  requireAuth,
  withPagination,
  withSorting<User.SortPollsFields>({
    allowedFields: ["createdAt", "totalVotes", "isPublic"],
    defaultField: "createdAt",
  }),
  MeController.GetPolls
);

export default router;
