import type { Handler } from "express";

import { getUserPolls } from "../services/poll";
import { deleteUser, updateUserData, getUserVotes } from "../services/user";

export const GetPolls: Handler = async (req, res, next) => {
  try {
    const { id: userId } = req.user.data!;
    const user = await getUserPolls(userId, req.pagination);

    return res.send(user);
  } catch (error) {
    next(error);
  }
};

export const UpdateData: Handler = async (req, res, next) => {
  try {
    const { id: userId } = req.user.data!;
    const data = req.body;
    const user = await updateUserData(userId, data);

    return res.send(user);
  } catch (error) {
    next(error);
  }
};

export const DeleteUser: Handler = async (req, res, next) => {
  try {
    const { id: userId } = req.user.data!;
    await deleteUser(userId);

    return res.status(200);
  } catch (error) {
    next(error);
  }
};

export const GetUserVotes: Handler = async (req, res, next) => {
  try {
    const { id: userId } = req.user.data!;
    const votes = await getUserVotes(userId, req.pagination);

    return res.send(votes);
  } catch (error) {
    next(error);
  }
};
