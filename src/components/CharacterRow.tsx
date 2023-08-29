import React, { FunctionComponent, MouseEventHandler } from "react";
import { Character } from "../types";
import SaveButton from "./SaveButton";
import Trait from "./Trait";

type CharacterRowProps = Character & { onClick?: () => void };

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
  race,
  gender,
  onClick,
}) => {
  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-12 gap-4 py-2 hover:bg-sky-50">
      <div className="flex items-center col-span-8">
        <div className="flex items-center w-10">
          <Trait trait={O - C + E - A + N} />
        </div>
        <div className="w-10">
          <SaveButton onClick={handleOnClick} />
        </div>
        <div className="leading-4">
          <strong>{name}</strong>, {race} {gender}
          <br />
          <span className="text-xs">
            {cope} <i>hides</i> {issue}, <i>desires</i> {need}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end col-span-4">
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
