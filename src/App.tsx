import { Link, useParams } from "react-router-dom";
import races from "./data/races.json";
import { generateCharacters, normalizeGender } from "./helpers";
import Trait from "./Trait";

const traits = [
  "Openness",
  "Conscientiousness",
  "Extraversion",
  "Agreeableness",
  "Neuroticism",
];

function App() {
  const { race = "human", gender = "male" } = useParams();

  const normalizedGender = normalizeGender(gender);

  const characters = generateCharacters(20, race, normalizedGender);

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
