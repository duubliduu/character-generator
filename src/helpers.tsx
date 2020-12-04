import React from "react";
import Column from "./components/Column";

export const randomNumber = (range: number) => Math.ceil(Math.random() * range);

export const randomSet = (size: number, range: number = 20): number[] => {
  const set = [];
  for (let i = 0; i < size; i++) {
    const value = randomNumber(range);
    set.push(value);
  }
  return set;
};

export const getPersonality = () => {
  return randomSet(5, 20);
};

const raceSkillMap: { [key: string]: number[][] } = {
  human: [
    [4, 6, 6, 7, 6, 5],
    [6, 7, 7, 8, 7, 5],
    [5, 7, 7, 7, 7, 5],
    [5, 8, 6, 6, 6, 5],
    [5, 7, 6, 6, 7, 5],
    [7, 6, 6, 7, 6, 5],
    [7, 6, 6, 8, 6, 5],
    [5, 6, 6, 6, 6, 5],
  ],
  duck: [
    [6, 5, 6, 6, 6, 5],
    [8, 6, 7, 8, 7, 5],
    [7, 6, 7, 7, 7, 5],
    [7, 7, 6, 6, 7, 5],
    [7, 7, 6, 6, 7, 5],
    [8, 5, 6, 7, 6, 5],
    [8, 5, 6, 7, 6, 5],
    [7, 5, 6, 6, 6, 5],
  ],
  elf: [
    [6, 7, 7, 8, 7, 5],
    [7, 8, 8, 10, 8, 5],
    [6, 8, 8, 8, 9, 5],
    [6, 9, 7, 7, 7, 5],
    [6, 8, 7, 7, 8, 5],
    [8, 7, 7, 8, 7, 5],
    [8, 7, 7, 9, 7, 5],
    [6, 7, 7, 7, 7, 5],
  ],
  dwarf: [
    [6, 6, 6, 7, 6, 5],
    [8, 7, 7, 9, 7, 5],
    [6, 7, 7, 7, 7, 5],
    [6, 8, 6, 6, 7, 5],
    [6, 7, 6, 6, 7, 5],
    [9, 6, 6, 8, 6, 5],
    [9, 6, 6, 9, 6, 5],
    [6, 6, 6, 6, 6, 5],
  ],
  troll: [
    [3, 6, 6, 7, 6, 5],
    [6, 7, 7, 9, 7, 5],
    [4, 7, 7, 7, 7, 5],
    [4, 8, 6, 6, 6, 5],
    [4, 7, 6, 6, 7, 5],
    [7, 6, 6, 8, 6, 5],
    [6, 6, 6, 9, 6, 5],
    [4, 6, 6, 6, 6, 5],
  ],
};

export const types = [
  "Strong",
  "Skilled",
  "Intelligent",
  "Attractive",
  "Resilient",
  "Light",
  "Athletic",
  "Average",
];

export const getType = (): string => {
  return randomItem(types);
};

export const getSkills = (race: string, type: string): number[] => {
  //  const typeIndex = types.indexOf(type);
  // return raceSkillMap[race][typeIndex];
  return [10, 9, 8, 7, 6, 5, 4].sort(() => Math.random() - 0.5);
};

export const getRandomGender = () => (Math.random() > 0.5 ? "male" : "female");

function randomItem<T>(set: T[]): T {
  return [...set].sort(() => Math.random() - 0.5)[0];
}

const defaultRaceProfessionMap = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
];

const raceProfessionMap: { [key: string]: number[] } = {
  human: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  troll: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  elf: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  dwarf: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  duck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
};

const professions = [
  "Artisan",
  "Entertainer",
  "Farmer",
  "Fisherman",
  "Gatherer",
  "Hunter",
  "Merchant",
  "Noble",
  "Shepherd",
  "Physician",
  "Priest",
  "Sailor",
  "Scribe",
  "Shaman",
  "Soldier",
  "Sorcerer",
  "Thief",
  "Warrior",
];

const races = ["duck", "troll", "elf", "dwarf", "human"];

const picksFromSet = (picks: number[], set: string[]): string[] => {
  return picks.map((index) => set[index]);
};

export const getRandomProfession = (race: string): string => {
  const picks = raceProfessionMap[race] || defaultRaceProfessionMap;
  return randomItem(picksFromSet(picks, professions));
};

export const getRandomRace = () => {
  return randomItem(races);
};

export const toString = (a: number, b: number = 0): string => {
  if (!b) {
    return `${10 - a > -1 ? "+" : ""}${10 - a}`;
  }
  return `${10 - a - b > -1 ? "+" : ""}${10 - a - b}`;
};

export const toTrait = (a: number) => {
  return (
    (a === 20 && "++") || (a > 12 && "+") || (a < 9 && "-") || (a === 1 && "--")
  );
};
