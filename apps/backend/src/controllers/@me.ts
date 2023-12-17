import type { SortingParams, User } from "@poll/types";
import type { Request, Response, NextFunction } from "express";

import {
  deleteUser,
  updateUserData,
  getUserVotes,
  getUserPolls,
} from "../services/user";

export const UpdateData = async (
  req: Request,
  res: Response<User.ApiResponse["updateUser"]>,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user.data!;
    const data = req.body;
    const user = await updateUserData(userId, data);

    return res.send(user);
  } catch (error) {
    next(error);
  }
};

export const DeleteUser = async (
  req: Request,
  res: Response<User.ApiResponse["deleteUser"]>,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user.data!;
    await deleteUser(userId);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const GetPolls = async (
  req: Request,
  res: Response<User.ApiResponse["getUserPolls"]>,
  next: NextFunction
) => {
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

export const GetUserVotes = async (
  req: Request,
  res: Response<User.ApiResponse["getUserVotes"]>,
  next: NextFunction
) => {
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
