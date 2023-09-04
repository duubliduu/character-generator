import needs from "./data/needs.json";
import identities from "./data/identities.json";
import copes from "./data/copes.json";
import issues from "./data/issues.json";
import { nameByRace } from "fantasy-name-generator";
import { Character, Gender, Storage, Traits } from "./types";

export const formatModifier = (number: number) =>
  number > 0 ? `+${number}` : number;

export const rollD4 = () => Math.ceil(Math.random() * 4);

export const rollD6 = () => Math.floor(Math.random() * 6);

export const randomTrait = () => rollD6() + rollD6() + rollD6() + rollD6() - 14;

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

const traitSet: Traits = { O: 0, C: 0, E: 0, A: 0, N: 0 };

const getSettings = (): Storage["settings"] => {
  const storage = getStorage();

  if (Array.isArray(storage)) {
    return { randomSet: false };
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

const set = [3, 1, 1, 2, 2];

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
