import Layout from "./Layout";
import Random from "./Random";
import Bank from "./Bank";
import races from "../data/races.json";
import { Gender } from "../types";
import React, { ReactEventHandler, useContext } from "react";
import { CharacterContext } from "../CharacterStore";
import { normalizeGender } from "../helpers";

function App() {
  const { randomize, race, setRace, gender, setGender } =
    useContext(CharacterContext);

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
        <div className="flex justify-between items-center">
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
          <button
            className="ml-4 px-3 py-1 rounded bg-sky-300"
            onClick={() => randomize()}
          >
            Roll
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="mr-8">
          <Random />
        </div>
        <div className="ml-8">
          <Bank />
        </div>
      </div>
    </Layout>
  );
}

export default App;
