import type { PrismaPromise } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

import { generateFakePollData, shuffle } from "./seed.utils";

const prisma = new PrismaClient();

const main = async () => {
  const count = await clearDB();
  console.log(`Database has been cleared. (removed ${count} records)`);
  const data = await getPollsData(50);

  const transactions: PrismaPromise<unknown>[] = [];
  for (const pollData of data) {
    transactions.push(
      prisma.poll.create({
        data: {
          question: pollData.question,
          answers: {
            createMany: {
              data: pollData.answers,
            },
          },
          isPublic: true,
        },
      })
    );
  }

  const response = await prisma.$transaction(transactions);
  console.log(`Created ${response.length} polls`);
};

main();

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
  const { count } = await prisma.poll.deleteMany({});
  return count;
}
