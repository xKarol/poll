import express from "express";

import * as PollController from "../controllers/poll";
import { validateSchema } from "../middlewares/validate-schema";
import * as PollSchema from "../schemas/poll";

const router = express.Router();

router.get(
  "/poll/:pollId",
  validateSchema(PollSchema.getPoll),
  PollController.GetOne
);

router.post(
  "/poll",
  validateSchema(PollSchema.createPoll),
  PollController.Create
);

router.delete(
  "/poll/:pollId",
  validateSchema(PollSchema.deletePoll),
  PollController.Delete
);

router.post(
  "/poll/:pollId/vote/:answerId",
  validateSchema(PollSchema.votePoll),
  PollController.Vote
);

export default router;
