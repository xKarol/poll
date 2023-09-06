import { faker } from "@faker-js/faker";
import type { Poll, Answer, User } from "@prisma/client";
import { randomUUID } from "node:crypto";

export function generateFakePollData(isPublic: boolean = true) {
  const pollId = randomUUID();

  const data: Poll & { answers: Omit<Answer, "id" | "pollId">[] } = {
    id: pollId,
    question: faker.lorem.sentence(),
    answers: Array.from({ length: 4 }, generateFakePollAnswerData),
    isPublic: isPublic,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };
  return data;
}

export function generateFakePollAnswerData() {
  const data: Omit<Answer, "id" | "pollId"> = {
    text: faker.datatype.boolean()
      ? faker.lorem.word()
      : faker.lorem.sentence(),
    votes: 0,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };
  return data;
}

export function generateFakeUserData() {
  const data: Omit<User, "id"> = {
    email: faker.internet.email(),
    name: faker.internet.displayName(),
    emailVerified: faker.date.past(),
    image: faker.internet.avatar(),
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
