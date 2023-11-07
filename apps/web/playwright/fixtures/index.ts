/* eslint-disable no-empty-pattern */
import { test as base } from "@playwright/test";

import { createPollFixture } from "./poll";
import { createPrismaFixture } from "./prisma";

export type Fixtures = {
  prisma: ReturnType<typeof createPrismaFixture>;
  poll: ReturnType<typeof createPollFixture>;
};

export const test = base.extend<Fixtures>({
  prisma: async ({}, use) => {
    await use(createPrismaFixture());
  },
  poll: async ({}, use) => {
    await use(createPollFixture());
  },
});
