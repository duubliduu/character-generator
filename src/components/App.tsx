import Layout from "./Layout";
import Random from "./Random";
import Bank from "./Bank";
import races from "../data/races.json";
import { Gender } from "../types";
import { ReactEventHandler, useContext } from "react";
import { CharacterContext } from "../CharacterStore";
import { normalizeGender } from "../helpers";
import Modal from "react-modal";

function App() {
  const {
    randomize,
    race,
    setRace,
    gender,
    setGender,
    isMigrated,
    migrate,
    toggleSetting,
    settings,
  } = useContext(CharacterContext);

  const handleSelectRace: ReactEventHandler<HTMLSelectElement> = (event) => {
    setRace(event.currentTarget.value);
    randomize();
  };

  const handleSelectGender: ReactEventHandler<HTMLSelectElement> = (event) => {
    setGender(normalizeGender(event.currentTarget.value));
    randomize();
  };

  if (!isMigrated) {
    return (
      <Modal isOpen>
        <div className="flex flex-col items-center justify-center">
          <p className="py-4 text-center">
            Storage is in outdated format.
            <br />
            Migration is needed.
          </p>
          <button onClick={migrate} className="p-4 border-2 rounded">
            Migrate storage
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-4 rounded border bg-slate-400 p-2">
        <div className="col-span-4 w-full flex items-center">
          <label className="cursor-pointer pr-2 hidden md:block text-white">
            Race
          </label>
          <select
            onChange={handleSelectRace}
            value={race}
            className="w-full p-2 rounded"
          >
            {races.map((_race, index) => (
              <option key={index} value={_race}>
                {_race}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-4 w-full flex items-center">
          <label className="cursor-pointer pr-2 hidden md:block text-white">
            Gender
          </label>
          <select
            onChange={handleSelectGender}
            value={gender}
            className="w-full p-2 rounded"
          >
            {[Gender.Male, Gender.Female].map((_gender, index) => (
              <option key={index} value={_gender}>
                {_gender}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <button className="text-white leading-4" onClick={() => toggleSetting("randomSet")}>
            {settings?.randomSet ? "Standard set" : "Random set"}
          </button>
        </div>
        <div className="col-span-2">
          <button
            className="py-1 rounded w-full border-2 border-white text-white hover:bg-slate-300 active:bg-slate-500"
            onClick={() => randomize()}
          >
            Roll
          </button>
        </div>
      </div>
      <div>
        <button onClick={() => toggleSetting("absoluteValues")}>
          Toggle absolute values: {settings?.absoluteValues ? "on" : "off"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:mr-8">
          <Random />
        </div>
        <div className="md:ml-8">
          <Bank />
        </div>
      </div>
    </Layout>
  );
}

export default App;
