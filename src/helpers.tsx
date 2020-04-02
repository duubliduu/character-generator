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

export const getSkills = () => {
  return randomSet(7, 10);
};

export const getRandomGender = () => (Math.random() > 0.5 ? "male" : "female");

function randomItem<T>(set: T[]): T {
  return set.sort(() => Math.random() - 0.5)[0];
}

export const getRandomProfession = () => {
  const professions = [
    "artisan",
    "entertainer",
    "farmer",
    "fisherman",
    "hunter",
    "merchant",
    "noble",
    "shepherd",
    "physician",
    "priest",
    "sailor",
    "scribe",
    "shaman",
    "soldier",
    "sorcerer",
    "thief",
  ];
  return randomItem(professions);
};

export const getRandomRace = () => {
  const races = ["troll", "elf", "dwarf", "human"];
  return randomItem(races);
};
