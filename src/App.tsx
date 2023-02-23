import { nameByRace } from "fantasy-name-generator";
import { Link, useParams } from "react-router-dom";
import copes from "./data/copes.json";
import identities from "./data/identities.json";
import needs from "./data/needs.json";
import races from "./data/races.json";
import issues from "./data/issues.json";
import { FunctionComponent } from "react";

enum Gender {
  Male = "male",
  Female = "female",
}

const formatModifier = (number: number) => (number > 0 ? `+${number}` : number);

const rollD4 = () => Math.ceil(Math.random() * 4);

const randomTrait = () => rollD4() - rollD4();

const fillObject = (object: Record<string, any>, fill: () => any) => {
  return Object.keys(object).reduce((a, c) => {
    return {
      ...a,
      [c]: fill(),
    };
  }, {});
};

const randomNeed = () => {
  return needs.sort(() => Math.random() - 0.5)[0];
};

const randomIdentity = () => {
  return identities.sort(() => Math.random() - 0.5)[0];
};

const randomCope = () => {
  return copes.sort(() => Math.random() - 0.5)[0];
};

const randomIssue = () => {
  return issues.sort(() => Math.random() - 0.5)[0];
};

type Character = {
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

const generateCharacters = (
  number: number,
  race: string,
  gender: Gender
): Character[] =>
  Array(number)
    .fill(null)
    .map(() => ({
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
    }));

const normalizeGender = (gender: string) => {
  switch (gender) {
    case "female":
      return Gender.Female;
    case "male":
    default:
      return Gender.Male;
  }
};

const Trait: FunctionComponent<{ trait: number }> = ({ trait }) => (
  <td className="text-center border-solid border-slate-200 border-2">
    <span>{formatModifier(trait)}</span>
  </td>
);

function App() {
  const { race = "human", gender = "male" } = useParams();

  const normalizedGender = normalizeGender(gender);

  const characters = generateCharacters(20, race, normalizedGender);

  const traits = [
    "Openness",
    "Conscientiousness",
    "Extraversion",
    "Agreeableness",
    "Neuroticism",
  ];

  return (
    <div className="container py-2 text-current">
      <div className="bg-white dark:bg-dark rounded-lg shadow-xl  px-6 py-4 ring-1 ring-slate-200">
        <div>
          <table className="table-auto border-collapse">
            <thead>
              <tr>
                <th>Name</th>
                {traits.map((trait, index) => (
                  <th key={index} className="sm:w-14 md:w-20 lg:w-32 leading-4">
                    <span>{trait[0]}</span>
                    <span className="hidden lg:block text-xs font-light">
                      {trait}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {characters.map(
                (
                  { name, O, C, E, A, N, identity, need, cope, issue },
                  index
                ) => (
                  <tr key={index}>
                    <td className="leading-4 border-solid border-slate-200 border-2 px-2 py-2">
                      {name}
                      <br />
                      <span className="text-xs">
                        {cope} <i>hides</i> {issue}, <i>desires</i> {need}
                      </span>
                    </td>
                    <Trait trait={O} />
                    <Trait trait={C} />
                    <Trait trait={E} />
                    <Trait trait={A} />
                    <Trait trait={N} />
                  </tr>
                )
              )}
              <tr>
                <td colSpan={16}>
                  <Link className="cursor-pointer" to={`/${race}/male`}>
                    male
                  </Link>
                  ,{" "}
                  <Link className="cursor-pointer" to={`/${race}/female`}>
                    female
                  </Link>
                  ,{" "}
                  {races.map((_race, index) => (
                    <span key={index}>
                      <Link to={`/${_race}/${gender}`}>{_race}</Link>
                      {`, `}
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
