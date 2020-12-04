import {
  getPersonality,
  getRandomGender,
  getRandomProfession,
  getRandomRace,
  getSkills,
  getType,
  randomNumber
} from "./helpers";
import { nameByRace } from "fantasy-name-generator";

export interface Character {
  name: string;
  type: string;
  gender: string;
  race: string;
  profession: string;
  proficiency: number;
  personality: number[];
  skills: number[];
}

type RaceMap = { [race: string]: string };

const raceMap: RaceMap = {
  human: "human",
  duck: "human",
  troll: "demon",
  elf: "elf",
  dwarf: "dwarf"
};

export const createCharacter = (): Character => {
  const personality = getPersonality();
  const race = getRandomRace();
  const type = getType();
  const skills = getSkills(race, type);
  const gender = getRandomGender();
  const nameOrError = nameByRace(raceMap[race], { gender });
  if (typeof nameOrError !== "string") {
    throw new Error(nameOrError.message);
  }
  const profession = getRandomProfession(race);
  const proficiency = randomNumber(10);
  return {
    name: nameOrError,
    type,
    gender,
    race,
    profession,
    proficiency,
    personality,
    skills
  };
};

const getNewOrCached = (index: number): Character => {
  const storageId = `character-${index}`;
  const storedItem = window.localStorage.getItem(storageId);
  if (storedItem) {
    return JSON.parse(storedItem);
  }
  const newCharacter = createCharacter();
  window.localStorage.setItem(storageId, JSON.stringify(newCharacter));

  return newCharacter;
};

export const createCharacters = (onlyNew = false): Character[] => {
  const characters = [];
  for (let i = 0; i < 20; i++) {
    const character = onlyNew ? createCharacter() : getNewOrCached(i);
    characters.push(character);
  }
  return characters;
};
