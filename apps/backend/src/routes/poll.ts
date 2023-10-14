import { apiUrls } from "@poll/config";
import express from "express";

import * as PollController from "../controllers/poll";
import { validateSchema } from "../middlewares/validate-schema";
import { withPagination } from "../middlewares/with-pagination";
import * as PollSchema from "../schemas/poll";

const router = express.Router();

router.get(
  apiUrls.poll.getOne(":pollId"),
  validateSchema(PollSchema.getPoll),
  PollController.GetOne
);

router.get("/poll", withPagination, PollController.Get);

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

router.get(apiUrls.poll.getVoters(":pollId"), PollController.GetPollVoters);

router.get(
  apiUrls.poll.getUserAnswerChoice(":pollId"),
  PollController.GetPollUserAnswerChoice
);

export default router;
