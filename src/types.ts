export enum Gender {
  Male = "male",
  Female = "female",
}

export enum Trait {
  H = "H",
  N = "N",
  E = "E",
  A = "A",
  C = "C",
  O = "O",
}

export type Traits = Record<Trait, number>;

export type Character = {
  name: string;
  need: string;
  cope: string;
  identity: string;
  issue: string;
  speed: number;
  race: string;
  gender: Gender;
  background: string;
  tree?: Couple;
} & Traits;

export type Couple = {
  left: Member;
  right?: Member;
  children: Couple[];
};

export type Member = {
  name: string;
  gender: Gender;
  race: string;
} & Traits;

export type Storage = {
  characters: Character[];
  archived: Character[];
  settings: { randomSet: boolean; absoluteValues: boolean };
};
