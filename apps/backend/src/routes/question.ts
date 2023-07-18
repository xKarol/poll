import express from "express";

import * as QuestionController from "../controllers/question";
import { validateSchema } from "../middlewares/validate-schema";
import * as QuestionSchema from "../schemas/question";

const router = express.Router();

router.post(
  "/question",
  validateSchema(QuestionSchema.createQuestion),
  QuestionController.Create
);

router.post(
  "/question/:questionId",
  validateSchema(QuestionSchema.deleteQuestion),
  QuestionController.Delete
);

export default router;
