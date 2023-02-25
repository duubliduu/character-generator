import { useParams } from "react-router-dom";
import {
  Character,
  Gender,
  generateCharacter,
  generateCharacters,
  normalizeGender,
} from "./helpers";
import Trait from "./Trait";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const traits = [
  "Openness",
  "Conscientiousness",
  "Extraversion",
  "Agreeableness",
  "Neuroticism",
];

const localStorageKey = "character-generator";

const saveCharacters = (characters: Character[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(characters));
};

const getCharacters = (): Character[] => {
  const storedItem = localStorage.getItem(localStorageKey);
  return JSON.parse(storedItem || "[]");
};

const loadCharacters = (race: string, gender: Gender): Character[] => {
  const items = getCharacters();
  const missing = 20 - items.length;
  const newItems = [...generateCharacters(missing, race, gender), ...items];
  saveCharacters(newItems);
  return newItems;
};

function App() {
  const { race = "human", gender = "male" } = useParams();

  const normalizedGender = normalizeGender(gender);

  const [characters, setCharacters] = useState(
    loadCharacters(race, normalizedGender)
  );

  const regenerateCharacter = (index: number) => {
    characters[index] = generateCharacter(race, normalizedGender);
    setCharacters([...characters]);
  };

  const regenerateAllCharacters = () => {
    const allNewCharacters = generateCharacters(20, race, normalizedGender);
    setCharacters(allNewCharacters);
  };

  useEffect(() => {
    saveCharacters(characters);
  }, [characters]);

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
                <th>
                  <button onClick={regenerateAllCharacters}>
                    <ArrowPathIcon  className="w-4" />
                  </button>
                </th>
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
                    <td>
                      <button
                        className="rounded"
                        onClick={() => regenerateCharacter(index)}
                      >
                        <ArrowPathIcon  className="w-4" />
                      </button>
                    </td>
                  </tr>
                )
              )}
              <Footer race={race} gender={normalizedGender} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
