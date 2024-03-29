import { faker } from "@faker-js/faker";
import type { Poll, Answer, User } from "@prisma/client";

function getFakeDate() {
  const createdAt = faker.date.past();
  return {
    createdAt: createdAt,
    updatedAt: faker.datatype.boolean()
      ? createdAt
      : faker.date.between({ from: createdAt, to: Date.now() }),
  };
}

export function generateFakePollData(isPublic: boolean = true) {
  const data: Omit<Poll, "userId" | "id"> & {
    answers: Omit<Answer, "id" | "pollId">[];
  } = {
    question: faker.lorem.sentence(),
    answers: Array.from({ length: 4 }, generateFakePollAnswerData),
    isPublic: isPublic,
    requireRecaptcha: faker.datatype.boolean(),
    ...getFakeDate(),
  };
  return data;
}

export function generateFakePollAnswerData() {
  const data: Omit<Answer, "id" | "pollId"> = {
    text: faker.datatype.boolean()
      ? faker.lorem.word()
      : faker.lorem.sentence(),
    votes: 0,
    ...getFakeDate(),
  };
  return data;
}

export function generateFakeUserData() {
  const data: Omit<User, "id"> = {
    email: faker.internet.email(),
    name: faker.internet.displayName(),
    emailVerified: faker.date.past(),
    image: faker.internet.avatar(),
    plan: faker.helpers.arrayElement(["FREE", "BASIC", "PRO"]),
    timeZone: faker.location.timeZone(),
    clockType: 12,
    ...getFakeDate(),
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
