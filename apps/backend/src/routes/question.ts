import express from "express";

import * as QuestionController from "../controllers/question";
import { validateSchema } from "../middlewares/validate-schema";
import * as QuestionSchema from "../schemas/question";

const router = express.Router();

router.get(
  "/question/:questionId",
  validateSchema(QuestionSchema.getQuestion),
  QuestionController.GetOne
);

router.post(
  "/question",
  validateSchema(QuestionSchema.createQuestion),
  QuestionController.Create
);

router.delete(
  "/question/:questionId",
  validateSchema(QuestionSchema.deleteQuestion),
  QuestionController.Delete
);

export default router;
