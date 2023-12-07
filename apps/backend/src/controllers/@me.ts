import type { SortingParams, User } from "@poll/types";
import type { Handler } from "express";

import {
  deleteUser,
  updateUserData,
  getUserVotes,
  getUserPolls,
} from "../services/user";

export const GetPolls: Handler = async (req, res, next) => {
  try {
    const { id: userId } = req.user.data!;
    const { sortBy, orderBy } =
      req.sorting as SortingParams<User.SortPollsFields>;
    const user = await getUserPolls({
      userId,
      sortBy,
      orderBy,
      ...req.pagination,
    });

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

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const GetUserVotes: Handler = async (req, res, next) => {
  try {
    const { id: userId } = req.user.data!;
    const { sortBy, orderBy } =
      req.sorting as SortingParams<User.SortVotesFields>;
    const votes = await getUserVotes({
      userId,
      ...req.pagination,
      sortBy,
      orderBy,
    });

    return res.send(votes);
  } catch (error) {
    next(error);
  }
};
