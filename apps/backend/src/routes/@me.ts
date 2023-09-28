import express from "express";

import * as MeController from "../controllers/@me";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";
import { withPagination } from "../middlewares/with-pagination";
import * as UserSchema from "../schemas/user";

const router = express.Router();

router.get("/@me/poll", requireAuth, withPagination, MeController.GetPolls);
router.patch(
  "/@me",
  validateSchema(UserSchema.updateUser),
  requireAuth,
  MeController.UpdateData
);
router.delete("/@me", requireAuth, MeController.DeleteUser);

export default router;
