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

export const TYPES = {
  A: "A", // 2d20 roll under + modifier
  B: "B", // 2d10 roll under over
  C: "C", // 2d20 under trait + target number
};

const randomTrait = (type) => {
  switch (type) {
    case TYPES.A:
      return 5 + Math.floor(new DiceRoller().roll("3d6/2").total);
    case TYPES.B:
      return new DiceRoller().roll("1d8+1").total;
    case TYPES.C:
      return Math.floor(new DiceRoller().roll("3d6/2").total);
    default:
      return 10;
  }
};

const generateCharacters = (number, race, gender, type) =>
  Array(number)
    .fill(null)
    .map(() => ({
      name: nameByRace(race, {
        gender,
      }),
      O: randomTrait(type),
      C: randomTrait(type),
      E: randomTrait(type),
      A: randomTrait(type),
      N: randomTrait(type),
    }));

function App() {
  const { race = "human", gender = "male", type = TYPES.A } = useParams();

  const characters = generateCharacters(20, race, gender, type);

  const formatModifier = (number) => (number > 0 ? `+${number}` : number);

  const renderTrait = (trait, type) => (
    <>
      <td
        className={`low ${trait < (type === TYPES.A ? 10 : 5) && "dominating"}`}
      >
        {type === TYPES.C
          ? trait
          : formatModifier(trait - (type === TYPES.B ? 5 : 10))}
      </td>
      <td className="score">{type !== TYPES.C && trait}</td>
      <td
        className={`high ${
          trait > (type === TYPES.A ? 10 : 5) && "dominating"
        }`}
      >
        {type === TYPES.C
          ? 10 - trait
          : formatModifier((type === TYPES.B ? 5 : 10) - trait)}
      </td>
    </>
  );
  return (
    <table className={`type-${type}`}>
      <thead>
        <tr>
          <th rowSpan={2}>Name</th>
          <th colSpan={3}>Openness</th>
          <th colSpan={3}>Conscientiousness</th>
          <th colSpan={3}>Extraversion</th>
          <th colSpan={3}>Agreeableness</th>
          <th colSpan={3}>Neuroticism</th>
        </tr>
        <tr>
          <th>Cautious</th>
          <th />
          <th>Curious</th>
          <th>Carefree</th>
          <th />
          <th>Careful</th>
          <th>Reserved</th>
          <th />
          <th>Outgoing</th>
          <th>Dominant</th>
          <th />
          <th>Empathic</th>
          <th>Confident</th>
          <th />
          <th>Sensitive</th>
        </tr>
      </thead>
      <tbody>
        {characters.map(({ name, O, C, E, A, N }, index) => (
          <tr key={index}>
            <td>{name}</td>
            {renderTrait(O, type)}
            {renderTrait(C, type)}
            {renderTrait(E, type)}
            {renderTrait(A, type)}
            {renderTrait(N, type)}
          </tr>
        ))}
        <tr>
          <td colSpan={16}>
            <Link to={`/${type}/${race}/male`}>male</Link>,{" "}
            <Link to={`/${type}/${race}/female`}>female</Link>,{" "}
            {races.map((_race, index) => (
              <span key={index}>
                <Link to={`/${type}/${_race}/${gender}`}>{_race}</Link>
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
