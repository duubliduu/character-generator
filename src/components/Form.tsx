import {
  ChangeEventHandler,
  FunctionComponent,
  useContext,
  useState,
} from "react";
import Layout from "./Layout";
import {Link, useNavigate, useParams} from "react-router-dom";
import { CharacterContext } from "../CharacterStore";
import { Character, Gender } from "../types";
import copes from "../data/copes.json";
import identities from "../data/identities.json";
import issues from "../data/issues.json";
import needs from "../data/needs.json";
import races from "../data/races.json";
import RandomizeButton from "./RandomizeButton";
import { nameByRace } from "fantasy-name-generator";
import { calculateSpeed } from "../helpers";

const Form: FunctionComponent = () => {
  const { savedCharacters, update } = useContext(CharacterContext);
  const { index } = useParams();
  const navigate = useNavigate();

  const character = savedCharacters[Number(index)];

  const [data, setData] = useState<Character>(character);

  if (!index) {
    return null;
  }

  const handleChange =
    (key: keyof Character): ChangeEventHandler<HTMLInputElement | HTMLSelectElement> =>
    (event) => {
      setData({ ...data, [key]: event.target.value });
    };

  const handleSave = () => {
    update(Number(index), data);
    navigate("/");
  };

  // Dropdowns
  const { name, need, cope, gender, race, identity, issue, speed, ...rest } =
    data;

  const handleRandomizeName = () => {
    const randomName = nameByRace(race, {
      gender,
    });
    if (typeof randomName === "string") {
      setData({ ...data, name: randomName });
    }
  };

  return (
    <Layout>
      <div className="flex items-center pb-4">
        <label className="pr-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          className="border border-slate-400 rounded p-1 w-full"
        />
        <select className="p-1" value={race} onChange={handleChange("race")}>
          {races.map((item, index) => (
            <option key={index}>
              {item}
            </option>
          ))}
        </select>
        <select className="p-1" value={race} onChange={handleChange("gender")}>
          {[Gender.Male, Gender.Female].map((item, index) => (
            <option key={index}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="col-span-3"
          value={identity}
          onChange={handleChange("identity")}
        >
          {identities.map((item, index) => (
            <option key={index}>
              {item}
            </option>
          ))}
        </select>
        <div className="pl-2 flex items-center">
          <RandomizeButton onClick={handleRandomizeName} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {Object.entries(rest).map(([key, value]) => (
          <div key={key} className="col-span-2 flex flex-col items-center">
            <label>{key}</label>
            <input
              type="number"
              value={value}
              onChange={handleChange(key as keyof Character)}
              className="border border-slate-400 rounded p-1 w-full text-center"
            />
          </div>
        ))}
        <div className="col-span-2 flex flex-col items-center">
          <label>Speed</label>
          <input
            type="number"
            value={calculateSpeed(rest)}
            readOnly
            className="p-1 w-full text-center"
          />
        </div>
        <label className="col-span-1">cope</label>
        <select
          className="col-span-3"
          value={cope}
          onChange={handleChange("cope")}
        >
          {copes.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label className="col-span-1">issue</label>
        <select
          className="col-span-3"
          value={issue}
          onChange={handleChange("issue")}
        >
          {issues.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label className="col-span-1">need</label>
        <select
          className="col-span-3"
          value={need}
          onChange={handleChange("need")}
        >
          {needs.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between pt-4">
        <Link to="/" className="rounded bg-slate-200 py-2 px-4">
          Cancel
        </Link>
        <button onClick={handleSave} className="rounded bg-slate-200 py-2 px-4">
          Save
        </button>
      </div>
    </Layout>
  );
};

export default Form;
