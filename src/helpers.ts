import needs from "./data/needs.json";
import identities from "./data/identities.json";
import copes from "./data/copes.json";
import issues from "./data/issues.json";
import { nameByRace } from "fantasy-name-generator";

export enum Gender {
  Male = "male",
  Female = "female",
}

export const formatModifier = (number: number) =>
  number > 0 ? `+${number}` : number;

export const rollD4 = () => Math.ceil(Math.random() * 4);

export const randomTrait = () => rollD4() - rollD4();

export const fillObject = (object: Record<string, any>, fill: () => any) => {
  return Object.keys(object).reduce((a, c) => {
    return {
      ...a,
      [c]: fill(),
    };
  }, {});
};

export const randomNeed = () => {
  return needs.sort(() => Math.random() - 0.5)[0];
};

export const randomIdentity = () => {
  return identities.sort(() => Math.random() - 0.5)[0];
};

export const randomCope = () => {
  return copes.sort(() => Math.random() - 0.5)[0];
};

export const randomIssue = () => {
  return issues.sort(() => Math.random() - 0.5)[0];
};

export type Character = {
  name: string;
  need: string;
  cope: string;
  identity: string;
  issue: string;
  O: number;
  C: number;
  E: number;
  A: number;
  N: number;
};

export const generateCharacter = (race: string, gender: Gender): Character => ({
  name: nameByRace(race, {
    gender,
  }) as string,
  ...(fillObject(
    { O: null, C: null, E: null, A: null, N: null },
    randomTrait
  ) as { O: number; C: number; E: number; A: number; N: number }),
  need: randomNeed(),
  cope: randomCope(),
  identity: randomIdentity(),
  issue: randomIssue(),
});

export const generateCharacters = (
  number: number,
  race: string,
  gender: Gender
): Character[] =>
  Array(number)
    .fill(null)
    .map(() => generateCharacter(race, gender));

export const normalizeGender = (gender: string) => {
  switch (gender) {
    case "female":
      return Gender.Female;
    case "male":
    default:
      return Gender.Male;
  }
};
