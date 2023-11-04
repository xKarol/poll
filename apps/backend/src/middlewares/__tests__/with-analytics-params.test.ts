import dayjs from "dayjs";
import express from "express";
import supertest from "supertest";
import { expect, test } from "vitest";

import { withAnalyticsParams } from "../with-analytics-params";

const app = express();

app.get("/test", withAnalyticsParams, (req, res) => {
  return res.send(req.analytics).status(200);
});

const request = () => supertest(app).get("/test");

test("should return default values", async () => {
  const { body } = await request().expect(200);
  expect(body.groupBy).toBe("hour");
  expect(body.dateFrom).toBe(dayjs().subtract(24, "hour").unix());
  expect(body.dateTo).toBe(dayjs().unix());
  expect(body.limit).toBe(50);
});

test.each([
  ["1h", 60, "minute"],
  ["24h", 24, "hour"],
  ["7d", 7, "day"],
  ["30d", 30, "day"],
  ["1y", 12, "month"],
])(
  "interval %s should return valid dateFrom and groupBy field",
  async (interval, value, groupBy) => {
    const { body } = await request().query({ interval: interval }).expect(200);
    expect(body.groupBy).toBe(groupBy);
    expect(body.dateFrom).toBe(
      dayjs()
        .subtract(value, groupBy as dayjs.ManipulateType)
        .unix()
    );
  }
);

test.each([1, 2, 3, 5, 50])(
  "valid 'limit=%s' query param should pass",
  async (value) => {
    const { body } = await request().query({ limit: value }).expect(200);
    expect(body.limit).toBe(value);
  }
);

test.each([-1, 0, -100, "2w", "0sd", "0&test=2"])(
  "invalid 'limit=%s' query param should throw error",
  async (value) => {
    await request().query({ limit: value }).expect(500);
  }
);

test.each([
  dayjs().subtract(1, "year").unix(),
  dayjs().subtract(8, "month").unix(),
  dayjs().subtract(8, "minute").unix(),
])("custom valid date %s param should pass", async (date) => {
  const { body: dateFromBody } = await request()
    .query({ dateFrom: date })
    .expect(200);
  expect(dateFromBody.dateFrom).toBe(date);
  const { body: dateToBody } = await request()
    .query({ dateTo: date })
    .expect(200);
  expect(dateToBody.dateTo).toBe(date);
});

test.each([
  // 122121, TODO fix
  0,
  -1,
  "asas",
  "021zz",
])("custom invalid date %s param should throw error", async (date) => {
  await request().query({ dateTo: date }).expect(500);
  await request().query({ dateFrom: date }).expect(500);
});

test.todo("should throw error when future dateTo param is set", async () => {
  await request()
    .query({ dateTo: dayjs().add(1, "minute").unix() })
    .expect(500);
  await request()
    .query({ dateTo: dayjs().add(1, "year").unix() })
    .expect(500);
  await request().query({ dateTo: dayjs().unix() }).expect(200);
});

test("should throw error when param dateFrom is greater than dateTo", async () => {
  await request()
    .query({
      dateFrom: dayjs().add(2, "day").unix(),
      dateTo: dayjs().add(1, "day").unix(),
    })
    .expect(500);
});

test("should throw error when difference between dates is less than 1 hour", async () => {
  await request()
    .query({
      dateFrom: dayjs().subtract(30, "minute").unix(), //30 minutes diff
      dateTo: dayjs().unix(),
    })
    .expect(500);
});
