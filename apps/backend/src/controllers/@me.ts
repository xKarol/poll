import type { Handler } from "express";

import { getUserPolls } from "../services/poll";
import { updateUserData } from "../services/user";

export const GetPolls: Handler = async (req, res, next) => {
  try {
    const { id: userId } = req.user!;
    const user = await getUserPolls(userId, req.pagination);

    return res.send(user);
  } catch (error) {
    next(error);
  }
};

export const UpdateData: Handler = async (req, res, next) => {
  try {
    const { id: userId } = req.user!;
    const data = req.body;
    const user = await updateUserData(userId, data);

    return res.send(user);
  } catch (error) {
    next(error);
  }
};
