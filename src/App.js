import { DiceRoller } from "@dice-roller/rpg-dice-roller";
import { nameByRace } from "fantasy-name-generator";
import { Link, useParams } from "react-router-dom";

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
  return formatModifier(10 - new DiceRoller().roll("2d6+3").total);
};

const fillObject = (object, fill) => {
  return Object.keys(object).reduce((a, c) => {
    return {
      ...a,
      [c]: fill(),
    };
  }, object);
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
    }));

function App() {
  const { race = "human", gender = "male" } = useParams();

  const characters = generateCharacters(20, race, gender);

  const renderTrait = (trait) => (
    <td className="score" colSpan={2}>
      {trait}
    </td>
  );

  return (
    <table className={`type-B`}>
      <thead>
        <tr>
          <th rowSpan={2}>Name</th>
          <th colSpan={2}>Openness</th>
          <th colSpan={2}>Conscientiousness</th>
          <th colSpan={2}>Extraversion</th>
          <th colSpan={2}>Agreeableness</th>
          <th colSpan={2}>Neuroticism</th>
        </tr>
        <tr>
          <th>Curious</th>
          <th>Cautious</th>
          <th>Careful</th>
          <th>Carefree</th>
          <th>Outgoing</th>
          <th>Reserved</th>
          <th>Empathic</th>
          <th>Dominant</th>
          <th>Sensitive</th>
          <th>Confident</th>
        </tr>
      </thead>
      <tbody>
        {characters.map(({ name, O, C, E, A, N }, index) => (
          <tr key={index}>
            <td>{name}</td>
            {renderTrait(O)}
            {renderTrait(C)}
            {renderTrait(E)}
            {renderTrait(A)}
            {renderTrait(N)}
          </tr>
        ))}
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
