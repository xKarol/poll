import request from "supertest";
import { expect, test } from "vitest";

import server from "..";

const supertest = request(server);

test("should return status 200", async () => {
  const response = await supertest.get("/health-check");
  expect(response.status).toBe(200);
});
