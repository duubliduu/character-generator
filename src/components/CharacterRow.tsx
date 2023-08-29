import React, { FunctionComponent, MouseEventHandler } from "react";
import { Character } from "../types";
import SaveButton from "./SaveButton";
import Trait from "./Trait";

type CharacterRowProps = Character & { onClick: () => void };

const CharacterRow: FunctionComponent<CharacterRowProps> = ({
  name,
  O,
  C,
  E,
  A,
  N,
  need,
  cope,
  issue,
  onClick,
}) => {
  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 py-2">
      <div className="col-span-1 flex items-center">
        <Trait trait={O - C + E - A + N} />
      </div>
      <div className="col-span-1 ">
        <SaveButton onClick={handleOnClick} />
      </div>
      <div className="leading-4 col-span-6">
        {name}
        <br />
        <span className="text-xs">
          {cope} <i>hides</i> {issue}, <i>desires</i> {need}
        </span>
      </div>
      <div className="col-span-4 flex items-center justify-between">
        <Trait trait={O} title="Openness" />
        <Trait trait={C} title="Conscientiousness" />
        <Trait trait={E} title="Extraversion" />
        <Trait trait={A} title="Agreeableness" />
        <Trait trait={N} title="Neuroticism" />
      </div>
    </div>
  );
};

export default CharacterRow;
