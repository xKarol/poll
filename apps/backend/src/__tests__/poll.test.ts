import request from "supertest";
import { expect, test } from "vitest";

import server from "..";

const supertest = request(server);

test("adds 1 + 2 to equal 3", async () => {
  const response = await supertest.get("/health-check");
  expect(response.status).toBe(200);
});
