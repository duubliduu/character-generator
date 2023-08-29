import { normalizeGender } from "../helpers";
import React, { ReactEventHandler, useContext } from "react";
import Layout from "./Layout";
import races from "../data/races.json";
import CharacterRow from "./CharacterRow";
import { CharacterContext } from "../CharacterStore";
import Table from "./Table";
import { Gender } from "../types";

function App() {
  const {
    randomCharacters: characters,
    save,
    randomize,
    race,
    setRace,
    gender,
    setGender,
  } = useContext(CharacterContext);

  const handleSaveCharacter = (index: number) => save(index);

  const handleSelectRace: ReactEventHandler<HTMLSelectElement> = (event) => {
    setRace(event.currentTarget.value);
    randomize();
  };

  const handleSelectGender: ReactEventHandler<HTMLSelectElement> = (event) => {
    setGender(normalizeGender(event.currentTarget.value));
    randomize();
  };

  return (
    <Layout>
      <div className="flex">
        <div className="flex justify-between">
          <label className="cursor-pointer pr-2">Race</label>
          <select onChange={handleSelectRace} value={race}>
            {races.map((_race, index) => (
              <option key={index} value={_race}>
                {_race}
              </option>
            ))}
          </select>
          <label className="cursor-pointer px-4">Gender</label>
          <select onChange={handleSelectGender} value={gender}>
            {[Gender.Male, Gender.Female].map((_gender, index) => (
              <option key={index} value={_gender}>
                {_gender}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Table>
        {characters.map((character, index) => (
          <CharacterRow
            key={index}
            {...character}
            onClick={() => handleSaveCharacter(index)}
          />
        ))}
      </Table>
    </Layout>
  );
}

export default App;
