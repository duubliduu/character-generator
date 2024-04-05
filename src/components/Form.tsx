import {
  ChangeEventHandler,
  FunctionComponent,
  useContext,
  useRef,
  useState,
} from "react";
import Layout from "./Layout";
import { useNavigate, useParams } from "react-router-dom";
import { CharacterContext } from "../CharacterStore";
import { Character, Couple, Gender, Trait, Traits } from "../types";
import copes from "../data/copes.json";
import classes from "../data/classes.json";
import issues from "../data/issues.json";
import needs from "../data/needs.json";
import races from "../data/races.json";
import RandomizeButton from "./RandomizeButton";
import { nameByRace } from "fantasy-name-generator";
import { calculateSpeed } from "../helpers";
import Family from "./Family";

const Form: FunctionComponent = () => {
  const { savedCharacters, update } = useContext(CharacterContext);
  const { index } = useParams();
  const navigate = useNavigate();

  const character = savedCharacters[Number(index)];

  const [data, setData] = useState<Character>(character);

  const handleChange =
    (
      key: keyof Character,
      transform: (value: any) => any = (value) => value
    ): ChangeEventHandler<HTMLInputElement | HTMLSelectElement> =>
    (event) => {
      setData({ ...data, [key]: transform(event.target.value) });
    };

  const handleSave = () => {
    data.tree = treeRef.current;
    update(Number(index), data);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  // Dropdowns
  const {
    name,
    need,
    cope,
    gender,
    race,
    identity,
    issue,
    speed,
    tree,
    background,
    ...rest
  } = data;

  const treeRef = useRef<Couple | undefined>(
    tree || {
      children: [],
      left: {
        gender,
        name,
        race,
        ...rest,
      },
    }
  );

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
            <option key={index}>{item}</option>
          ))}
        </select>
        <select
          className="p-1"
          value={gender}
          onChange={handleChange("gender")}
        >
          {[Gender.Male, Gender.Female].map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
        <select
          className="col-span-3"
          value={identity}
          onChange={handleChange("identity")}
        >
          {Object.values(classes).map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
        <div className="pl-2 flex items-center">
          <RandomizeButton onClick={handleRandomizeName} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {Object.keys(Trait).map((key) => (
          <div key={key} className="col-span-2 flex flex-col items-center">
            <label className="font-bold">{key}</label>
            <input
              type="number"
              value={rest[key as keyof Traits] ?? 0}
              onChange={handleChange(key as keyof Character, Number)}
              className="border border-slate-400 rounded p-1 w-full text-center"
            />
          </div>
        ))}
        <div className="col-span-2 flex flex-col items-center">
          <label className="font-bold">Speed</label>
          <input
            type="number"
            value={calculateSpeed(rest)}
            readOnly
            className="p-1 w-full text-center"
          />
        </div>
        <label className="col-span-1 font-bold">Cope</label>
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
        <label className="col-span-1 font-bold">Wound</label>
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
        <label className="col-span-1 font-bold">Need</label>
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
      <div className="flex justify-center">
        <Family
          name={name}
          gender={gender}
          race={race}
          {...rest}
          treeRef={treeRef}
        />
      </div>
      <div className="flex justify-between pt-4">
        <button
          onClick={handleCancel}
          className="rounded bg-slate-200 py-2 px-4"
        >
          Cancel
        </button>
        <button onClick={handleSave} className="rounded bg-slate-200 py-2 px-4">
          Save
        </button>
      </div>
    </Layout>
  );
};

export default Form;
