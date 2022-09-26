import { DiceRoller } from "@dice-roller/rpg-dice-roller";
import { nameByRace } from "fantasy-name-generator";
import { Link, useParams } from "react-router-dom";
import copes from "./data/copes.json";
import identities from "./data/identities.json";
import needs from "./data/needs.json";

import "./App.css";

const races = [
  "angel",
  "cavePerson",
  "darkelf",
  "demon",
  "dragon",
  "drow",
  "dwarf",
  "elf",
  "fairy",
  "gnome",
  "goblin",
  "halfdemon",
  "halfling",
  "highelf",
  "highfairy",
  "human",
  "ogre",
];

const formatModifier = (number) => (number > 0 ? `+${number}` : number);

const randomTrait = () => {
  // agreeableness of 12
  // roll under -2 Empathic resists
  // roll over -2 Dominant resists
  return new DiceRoller().roll("2d6+3").total - 10;
};

const fillObject = (object, fill) => {
  return Object.keys(object).reduce((a, c) => {
    return {
      ...a,
      [c]: fill(),
    };
  }, object);
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

const generateCharacters = (number, race, gender) =>
  Array(number)
    .fill(null)
    .map(() => ({
      name: nameByRace(race, {
        gender,
      }),
      ...fillObject(
        { O: null, C: null, E: null, A: null, N: null },
        randomTrait
      ),
      need: randomNeed(),
      cope: randomCope(),
      identity: randomIdentity(),
    }));

function App() {
  const { race = "human", gender = "male" } = useParams();

  const characters = generateCharacters(20, race, gender);

  const renderTrait = (trait) => (
    <td>
      <span className="score">{formatModifier(trait)}</span>
      <span className="targetNumber">
        {10 + trait}/{10 - trait}
      </span>
    </td>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>
            Name
            <span className="targetNumber">Target Number to ...</span>
          </th>
          <th>
            <span className="hide-mobile">
              Openness
              <span className="targetNumber">Read&nbsp;/&nbsp;Influence</span>
            </span>
            <span className="hide-desktop">O</span>
          </th>
          <th>
            <span className="hide-mobile">
              Conscientiousness
              <span className="targetNumber">Cheat&nbsp;/&nbsp;Trust</span>
            </span>
            <span className="hide-desktop">C</span>
          </th>
          <th>
            <span className="hide-mobile">
              Extraversion
              <span className="targetNumber">Socialize&nbsp;/&nbsp;Detect</span>
            </span>
            <span className="hide-desktop">E</span>
          </th>
          <th>
            <span className="hide-mobile">
              Agreeableness
              <span className="targetNumber">
                Manipulate&nbsp;/&nbsp;Dominate
              </span>
            </span>
            <span className="hide-desktop">A</span>
          </th>
          <th>
            <span className="hide-mobile">
              Neuroticism
              <span className="targetNumber">Terrorise&nbsp;/&nbsp;Strain</span>
            </span>
            <span className="hide-desktop">N</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {characters.map(
          ({ name, O, C, E, A, N, identity, need, cope }, index) => (
            <tr key={index}>
              <td>
                {name}
                <span className="need">
                  {cope} {identity} out for {need}
                </span>
              </td>
              {renderTrait(O)}
              {renderTrait(C)}
              {renderTrait(E)}
              {renderTrait(A)}
              {renderTrait(N)}
            </tr>
          )
        )}
        <tr>
          <td colSpan={16}>
            <Link to={`/${race}/male`}>male</Link>,{" "}
            <Link to={`/${race}/female`}>female</Link>,{" "}
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
  );
}

export default App;
