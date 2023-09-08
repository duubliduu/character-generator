import React, { FunctionComponent, ReactNode } from "react";
import { Character } from "../types";
import Trait from "./Trait";

type CharacterRowProps = Character & {
  actionButton?: ReactNode;
  onClick?: () => void;
};

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
  actionButton = null,
  onClick = () => {},
  identity,
    background,
}) => {
  const handleEditCharacter = () => {
    onClick();
  };

  return (
    <div className="flex items-center">
      <div className="">{actionButton}</div>
      <div
        className="grid grid-cols-12 md:grid-cols-1 lg:grid-cols-12 gap-4 py-2 hover:bg-slate-50 cursor-pointer"
        onClick={handleEditCharacter}
      >
        <div className="flex items-center col-span-8">
          <div className="flex items-center w-10">
            <Trait trait={O - C + E - A + N} />
          </div>
          <div className="leading-4">
            <strong>{name}</strong>, {race} {gender} {identity} {background}
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
    </div>
  );
};

export default CharacterRow;
