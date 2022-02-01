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

  const randomTrait = () => Math.floor(new DiceRoller().roll("3d6/2").total);

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
  return (
    <table>
      <thead>
        <tr>
          <th rowSpan={2}>Name</th>
          <th colSpan={2}>Openness</th>
          <th colSpan={2}>conscientiousness</th>
          <th colSpan={2}>Extraversion</th>
          <th colSpan={2}>Agreeableness</th>
          <th colSpan={2}>Neuroticism</th>
        </tr>
        <tr>
          <th>Cautious</th>
          <th>Curious</th>
          <th>Careless</th>
          <th>Careful</th>
          <th>Reserved</th>
          <th>Outgoing</th>
          <th>Dominant</th>
          <th>Empathic</th>
          <th>Confident</th>
          <th>Sensitive</th>
        </tr>
      </thead>
      <tbody>
        {characters.map(({ name, O, C, E, A, N }, index) => (
          <tr key={index}>
            <td>{name}</td>
            <td>{10 - O}</td>
            <td>{O}</td>
            <td>{10 - C}</td>
            <td>{C}</td>
            <td>{10 - E}</td>
            <td>{E}</td>
            <td>{10 - A}</td>
            <td>{A}</td>
            <td>{10 - N}</td>
            <td>{N}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={11}>
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
