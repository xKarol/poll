import { faker } from "@faker-js/faker";
import type { PrismaPromise, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

import {
  generateFakePollData,
  generateFakeUserData,
  shuffle,
} from "./seed.utils";

const prisma = new PrismaClient();

const main = async () => {
  const count = await clearDB();
  console.log(`Database has been cleared. (removed ${count} records)`);

  const users = await prisma.$transaction(seedUsers(50));
  console.log(`Created ${users.length} users`);

  const data = await getPollsData(50);

  const transactions: PrismaPromise<unknown>[] = [];
  for (const pollData of data) {
    transactions.push(
      prisma.poll.create({
        data: {
          userId: faker.datatype.boolean()
            ? users[Math.floor(Math.random() * users.length)].id
            : undefined,
          ...pollData,
          question: pollData.question,
          answers: {
            createMany: {
              data: pollData.answers,
            },
          },
        },
      })
    );
  }

  const response = await prisma.$transaction(transactions);
  console.log(`Created ${response.length} polls`);

  const votes = await seedVotes();
  console.log(`Created ${votes.length} poll votes`);
};

main();

function seedUsers(limit: number = 100) {
  const usersData = Array.from({ length: limit }, generateFakeUserData);
  const promises: PrismaPromise<User>[] = [];
  for (const userData of usersData) {
    promises.push(prisma.user.create({ data: userData }));
  }
  return promises;
}

async function seedVotes() {
  const users = await prisma.user.findMany({});
  const polls = await prisma.poll.findMany({ include: { answers: true } });
  const transactions: PrismaPromise<unknown>[] = [];
  for await (const poll of polls) {
    Array.from(
      {
        length: faker.number.int({ min: 0, max: 10 }),
      },
      (_, index) => {
        const answerId =
          poll.answers[Math.floor(Math.random() * poll.answers.length)].id;
        const pollId = polls[index].id;
        transactions.push(
          prisma.vote.create({
            data: {
              pollId: poll.id,
              answerId: answerId,
              userId: users[Math.floor(Math.random() * users.length)].id,
            },
          })
        );
        transactions.push(
          prisma.answer.update({
            where: {
              id: answerId,
            },
            data: {
              votes: { increment: 1 },
            },
          })
        );
        transactions.push(
          prisma.poll.update({
            where: {
              id: pollId,
            },
            data: {
              totalVotes: { increment: 1 },
            },
          })
        );
      }
    );
  }
  const data = await prisma.$transaction(transactions);
  return data;
}

async function getPollsData(limit: number = 25) {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${limit}&category=9&difficulty=medium&type=multiple`
    );
    const data = await res.json();
    const results = data.results;
    return Array.from({ length: results.length }, generateFakePollData).map(
      (poll, index) => {
        const result = results[index];
        const answers = shuffle([
          result.correct_answer,
          ...result.incorrect_answers,
        ]);

        return {
          ...poll,
          question: result.question,
          answers: poll.answers.map((answer, index) => ({
            ...answer,
            text: answers[index] as string,
          })),
        };
      }
    );
  } catch {
    console.log("WARN: API doesn't response. Using fake data...");
    return Array.from({ length: limit }, generateFakePollData);
  }
}

async function clearDB() {
  const { count: countPolls } = await prisma.poll.deleteMany({});
  const { count: countUsers } = await prisma.user.deleteMany({});
  return countPolls + countUsers;
}
