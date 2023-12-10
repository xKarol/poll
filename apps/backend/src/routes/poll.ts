import { apiUrls } from "@poll/config";
import type { Poll } from "@poll/types";
import express from "express";

import * as PollController from "../controllers/poll";
import { validateSchema } from "../middlewares/validate-schema";
import { withCache } from "../middlewares/with-cache";
import { withPagination } from "../middlewares/with-pagination";
import { withSorting } from "../middlewares/with-sorting";
import * as PollSchema from "../schemas/poll";

const router = express.Router();

router.get(
  apiUrls.poll.getOne(":pollId"),
  validateSchema(PollSchema.getPoll),
  withCache(60 * 30),
  PollController.GetOne
);

router.get(
  apiUrls.poll.getAll,
  withPagination,
  withSorting<Poll.SortPollFields>({
    allowedFields: ["createdAt", "totalVotes"],
    defaultField: "createdAt",
  }),
  withCache(60 * 30),
  PollController.Get
);

router.post(
  apiUrls.poll.create,
  validateSchema(PollSchema.createPoll),
  PollController.Create
);

router.delete(
  apiUrls.poll.delete(":pollId"),
  validateSchema(PollSchema.deletePoll),
  PollController.Delete
);

router.post(
  apiUrls.poll.vote(":pollId", ":answerId"),
  validateSchema(PollSchema.votePoll),
  PollController.Vote
);

router.get(
  apiUrls.poll.getVoters(":pollId"),
  withCache(60 * 60), // 1 hour
  PollController.GetPollVoters
);

router.get(
  apiUrls.poll.getUserAnswerChoice(":pollId"),
  withCache(60 * 60 * 12, { requireUser: true }), //12 hours
  PollController.GetPollUserAnswerChoice
);

export default router;
