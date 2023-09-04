import type { Handler } from "express";

import { getUserPolls } from "../services/poll";

export const GetPolls: Handler = async (req, res, next) => {
  try {
    const { id: userId } = req.user!;
    const user = await getUserPolls(userId, req.pagination);

    return res.send(user);
  } catch (error) {
    next(error);
  }
};
