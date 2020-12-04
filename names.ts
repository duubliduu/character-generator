import { nameByRace } from "fantasy-name-generator";

const genders: Array<"male" | "female"> = ["male", "female"];
const race = (process.argv.length === 3 && process.argv[2]) || "human";
const genderIndex = (process.argv.length === 4 && Number(process.argv[4])) || 0;

const names: string[] = [];
const gender: "male" | "female" = genders[genderIndex];

for (let i = 0; i < 20; i++) {
  const nameOrError = nameByRace(race, { gender });
  if (typeof nameOrError === "string") {
    names.push(nameOrError);
  } else {
    console.error(nameOrError);
  }
}

console.log(names.join(", "));
