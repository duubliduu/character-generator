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
  E: X,
  A,
  N: E,
  H,
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
            <Trait trait={O - C + X - A + E} />
          </div>
          <div className="leading-4">
            <strong>{name}</strong>, {race} {gender} {identity} {background}
            <br />
            <span className="text-xs">
              <span title="Need">{need}</span> /{" "}
              <span title="Wound">{issue}</span> /{" "}
              <span title="Cope">{cope}</span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end col-span-4">
          <Trait trait={H} title="Honesty" />
          <Trait trait={E} title="Emotionality" />
          <Trait trait={X} title="Extraversion" />
          <Trait trait={A} title="Agreeableness" />
          <Trait trait={C} title="Conscientiousness" />
          <Trait trait={O} title="Openness" />
        </div>
      </div>
    </div>
  );
};

export default CharacterRow;
