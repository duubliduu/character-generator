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

function App() {
  const { race = "human", gender = "male" } = useParams();

  const randomTrait = () =>
    5 - Math.floor(new DiceRoller().roll("3d6/2").total);

  const characters = Array(20)
    .fill(null)
    .map(() => ({
      name: nameByRace(race, {
        gender,
      }),
      O: randomTrait(),
      C: randomTrait(),
      E: randomTrait(),
      A: randomTrait(),
      N: randomTrait(),
    }));

  const addPlus = (number) => (number > 0 ? `+${number}` : number);

  const renderTrait = (trait) => (
    <>
      <td className="low">{addPlus(trait * -1)}</td>
      <td className="score">{10 + trait}</td>
      <td className="high">{addPlus(trait)}</td>
    </>
  );
  return (
    <table>
      <thead>
        <tr>
          <th rowSpan={2}>Name</th>
          <th colSpan={3}>Openness</th>
          <th colSpan={3}>conscientiousness</th>
          <th colSpan={3}>Extraversion</th>
          <th colSpan={3}>Agreeableness</th>
          <th colSpan={3}>Neuroticism</th>
        </tr>
        <tr>
          <th>Cautious</th>
          <th/>
          <th>Curious</th>
          <th>Careless</th>
          <th/>
          <th>Careful</th>
          <th>Reserved</th>
          <th/>
          <th>Outgoing</th>
          <th>Dominant</th>
          <th/>
          <th>Sympathic</th>
          <th>Confident</th>
          <th/>
          <th>Sensitive</th>
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
            {races.map((_race) => (
              <>
                <Link to={`/${_race}/${gender}`}>{_race}</Link>
                {", "}
              </>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;
