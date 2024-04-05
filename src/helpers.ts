import needs from "./data/needs.json";
import copes from "./data/copes.json";
import issues from "./data/issues.json";
import classes from "./data/classes.json";
import backgrounds from "./data/backgrounds.json";

import { nameByRace } from "fantasy-name-generator";
import {Character, Gender, Storage, Trait, Traits} from "./types";

export const formatModifier = (number: number) =>
  number > 0 ? `+${number}` : number;

export const rollD6MinusOne = () => Math.floor(Math.random() * 6) - 1;

export const randomTrait = () =>
  rollD6MinusOne() +
  rollD6MinusOne() +
  rollD6MinusOne() +
  rollD6MinusOne() -
  10;

export const fillObject = (object: Record<string, any>, fill: () => any) => {
  return Object.keys(object).reduce((a, c) => {
    return {
      ...a,
      [c]: fill(),
    };
  }, {});
};

export const random = () => Math.random() - 0.5;

export const randomOne = (items: any[]) => items.sort(random)[0];

export const randomNeed = () => {
  return randomOne(needs);
};

export const orderTraits = (traits: Partial<Traits>) =>
  Object.entries<number>(traits)
    .sort(random)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

export const flattenTrait = ([key, value]: [string, number]) => {
  if (value < 0) {
    return `Lo${key}`;
  }
  return `Hi${key}`;
};

export const determineMetaClass = (traits: Traits) => {
  const { N, ...rest } = traits;
  const [first, second] = orderTraits(rest);
  const key = [first, second]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(flattenTrait)
    .join("-");

  const metaClass = (classes as Record<string, string>)[key];

  if (!metaClass) {
    return key;
  }

  return metaClass;
};

export const randomCope = () => randomOne(copes);

export const randomIssue = () => randomOne(issues);

const traitSet: Traits = { O: 0, C: 0, E: 0, A: 0, N: 0, H: 0 };

export const getSettings = (): Storage["settings"] => {
  const storage = getStorage();

  if (Array.isArray(storage)) {
    return { randomSet: false, absoluteValues: false };
  }

  return storage.settings;
};

export const randomTraits = (): Traits => {
  const { randomSet } = getSettings();

  if (randomSet) {
    const randomSet: number[] = randomizeSet();
    const traits = traitSet;

    for (const key in traits) {
      traits[key as keyof Traits] = randomSet.shift() as Traits[keyof Traits];
    }

    return traits;
  }

  return fillObject(traitSet, randomTrait) as Traits;
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

export const randomBackground = () => randomOne(backgrounds);

export const generateCharacter = (race: string, gender: Gender): Character => {
  const traits = randomTraits();
  const speed = calculateSpeed(traits);

  return {
    name: randomName(race, gender),
    ...traits,
    need: randomNeed(),
    cope: randomCope(),
    identity: determineMetaClass(traits), // randomIdentity(),
    issue: randomIssue(),
    speed,
    race,
    gender,
    background: randomBackground(),
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

export const LOCAL_STORAGE_KEY = "character-generator";

const getStorage = (): Storage | Character[] =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

const setStorage = (payload: Partial<Storage>) => {
  const stored = getStorage();

  if (Array.isArray(stored)) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        characters: stored,
        settings: getSettings(),
        ...payload,
      })
    );
  }

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ ...stored, ...payload })
  );
};

export const saveCharacters = (characters: Character[]) => {
  setStorage({ characters });
};

export const addCharacter = (character: Character) => {
  const characters = [character, ...getCharacters()];
  setStorage({ characters });
};

export const updateCharacter = (index: number, character: Character) => {
  const characters = getCharacters();
  characters[index] = character;
  setStorage({ characters });
};

export const removeCharacter = (index: number) => {
  const characters = getCharacters();
  const archived = characters.splice(index, 1);
  setStorage({ characters, archived });
};

export const getCharacters = (): Character[] => {
  const storage = getStorage();

  if (Array.isArray(storage)) {
    return storage;
  }

  return storage.characters;
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
  const keys = Object.keys(Trait) as Array<keyof Traits>;
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

const set = [4, 3, 2, 2, 1, 1];

export const randomizeSet = (): number[] => {
  const [primary, ...rest] = set;

  const randomizedSet = rest
    .sort(() => Math.random() - 0.5)
    .map((a) => (Math.random() < 0.5 ? -a : a));

  const firstTree = randomizedSet.splice(0, 3);

  const firstTreeWithPrimary = [primary, ...firstTree]
    .sort(() => Math.random() - 0.5)
    .map((a) => (Math.random() < 0.5 ? -a : a));

  return [...firstTreeWithPrimary, ...randomizedSet];
};

export const downloadAsCsv = (characters: Character[]) => {
  const headers: string[] = Object.keys(characters[0]);
  const rows: string[][] = characters.map(
    (character) => Object.values(character) as string[]
  );

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((row) => row.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);

  window.open(encodedUri);
};

export const updateSettings = (newSettings: Storage["settings"]) => {
  const storage = getStorage();

  if (Array.isArray(storage)) {
    throw new Error("Storage does not support settings");
  }

  const { settings: oldSettings } = storage;

  setStorage({ settings: { ...oldSettings, ...newSettings } });
};
