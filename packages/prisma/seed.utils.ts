import { faker } from "@faker-js/faker";
import type { Poll, Answer } from "@prisma/client";
import { randomUUID } from "node:crypto";

export function generateFakePollData(isPublic: boolean = true) {
  const pollId = randomUUID();
  const noVotes = faker.number.int({ min: 0, max: 100 }) < 25;

  const data: Poll & { answers: Omit<Answer, "id" | "pollId">[] } = {
    id: pollId,
    question: faker.lorem.sentence(),
    answers: Array.from({ length: 4 }, () => {
      return generateFakePollAnswerData(noVotes);
    }),
    isPublic: isPublic,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };
  return data;
}

export function generateFakePollAnswerData(noVotes: boolean = false) {
  const data: Omit<Answer, "id" | "pollId"> = {
    text: faker.datatype.boolean()
      ? faker.lorem.word()
      : faker.lorem.sentence(),
    votes: noVotes ? 0 : faker.number.int({ min: 0, max: 5_000 }),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };
  return data;
}

export function shuffle(array: unknown[]) {
  let currentIndex = array.length;
  let randomIndex: number;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
