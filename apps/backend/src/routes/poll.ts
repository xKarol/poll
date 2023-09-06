import express from "express";

import * as PollController from "../controllers/poll";
import { validateSchema } from "../middlewares/validate-schema";
import { withPagination } from "../middlewares/with-pagination";
import * as PollSchema from "../schemas/poll";

const router = express.Router();

router.get(
  "/poll/:pollId",
  validateSchema(PollSchema.getPoll),
  PollController.GetOne
);

router.get("/poll", withPagination, PollController.Get);

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

router.get("/poll/:pollId/vote/users", PollController.VoteUsers);

export default router;
