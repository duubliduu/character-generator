export enum Gender {
  Male = "male",
  Female = "female",
}

export type Traits = {
  O: number;
  C: number;
  E: number;
  A: number;
  N: number;
};

export type Character = {
  name: string;
  need: string;
  cope: string;
  identity: string;
  issue: string;
  speed: number;
  race: string;
  gender: Gender;
} & Traits;
