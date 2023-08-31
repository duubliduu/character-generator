import needs from "./data/needs.json";
import identities from "./data/identities.json";
import copes from "./data/copes.json";
import issues from "./data/issues.json";
import { nameByRace } from "fantasy-name-generator";
import { Character, Gender, Traits } from "./types";

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

export const randomTraits = () => {
  return fillObject(
    { O: null, C: null, E: null, A: null, N: null },
    randomTrait
  ) as Traits;
};

export const randomName = (race = "human", gender = Gender.Male) => {
  const name = nameByRace(race, {
    gender,
  });

  if (typeof name !== "string") {
    throw new Error("Name is not a string");
  }

  return name;
};

export const randomGender = () => {
  return [Gender.Male, Gender.Female].sort(() => Math.random() - 0.5)[0];
};

export const generateCharacter = (race: string, gender: Gender): Character => {
  const traits = randomTraits();
  const speed = calculateSpeed(traits);

  return {
    name: randomName(race, gender),
    ...traits,
    need: randomNeed(),
    cope: randomCope(),
    identity: randomIdentity(),
    issue: randomIssue(),
    speed,
    race,
    gender,
  };
};

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

export const localStorageKey = "character-generator";

export const saveCharacters = (characters: Character[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(characters));
};

export const addCharacter = (character: Character) => {
  const characters = [character, ...getCharacters()];
  localStorage.setItem(localStorageKey, JSON.stringify(characters));
};

export const updateCharacter = (index: number, character: Character) => {
  const characters = getCharacters();
  characters[index] = character;
  localStorage.setItem(localStorageKey, JSON.stringify([...characters]));
};

export const removeCharacter = (index: number) => {
  const characters = getCharacters();
  characters.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify([...characters]));
};

export const getCharacters = (): Character[] => {
  const storedItem = localStorage.getItem(localStorageKey);
  return JSON.parse(storedItem || "[]");
};

export const sortCharacters = (characters: Character[]) =>
  characters.sort((a, b) => {
    return b.speed - a.speed;
  });

export const calculateSpeed = ({ O, C, E, A, N }: Traits) => O - C + E - A + N;

export const splitTraits = (traits: Traits): Traits[] => {
  const { O, C, E, A, N } = traits;
  return Object.entries({ O, C, E, A, N }).reduce(
    ([left, right], [key, value]) => {
      if (Math.random() - 0.5) {
        return [
          { ...left, [key]: value },
          { ...right, [key]: randomTrait() },
        ];
      }
      return [
        { ...left, [key]: randomTrait() },
        { ...right, [key]: value },
      ];
    },
    [{} as Traits, {} as Traits]
  );
};

export const combineTraits = (left: Traits, right: Traits) => {
  const keys: Array<keyof Traits> = ["O", "C", "E", "A", "N"];
  return keys.reduce((traits, key) => {
    if (Math.random() > 0.5) {
      return {
        ...traits,
        [key]: left[key],
      };
    }

    return {
      ...traits,
      [key]: right[key],
    };
  }, {} as Traits);
};

export const oppositeGender = (gender: Gender) =>
  gender === Gender.Female ? Gender.Male : Gender.Female;
