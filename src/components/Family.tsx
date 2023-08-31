import { FunctionComponent, MutableRefObject, useState } from "react";
import { Couple, Gender, Member } from "../types";
import {
  combineTraits,
  oppositeGender,
  randomGender,
  randomName,
  randomTraits,
  splitTraits,
} from "../helpers";
import AddButton from "./AddButton";

type FamilyProps = Member & {
  treeRef: MutableRefObject<Couple | undefined>;
};

const Family: FunctionComponent<FamilyProps> = ({
  name,
  gender,
  race,
  O,
  C,
  E,
  A,
  N,
  treeRef,
}) => {
  const [, setStamp] = useState(Date.now());

  const handleAddParents = (couple: Couple) => {
    const [left, right] = splitTraits(couple.left);
    const gender = randomGender();

    treeRef.current = {
      left: {
        name: randomName(race, Gender.Male),
        race,
        gender,
        ...left,
      },
      right: {
        name: randomName(race, Gender.Female),
        race,
        gender: oppositeGender(gender),
        ...right,
      },
      children: [{ ...couple }],
    };

    setStamp(Date.now()); // force update
  };

  const handleAddChildren = (couple: Couple & { right: Member }) => {
    const traits = combineTraits(couple.left, couple.right);

    const child = {
      name: randomName(race, Gender.Male) as string,
      gender: randomGender(),
      race,
      ...traits,
    };

    couple.children.push({ left: child, children: [] });
    setStamp(Date.now()); // force update
  };

  const handleAddPartner = (couple: Couple) => {
    const { race, gender } = couple.left;

    couple.right = {
      name: randomName(race, oppositeGender(gender)),
      gender: oppositeGender(gender),
      race,
      ...randomTraits(),
    };
    setStamp(Date.now()); // force update
  };

  const renderTree = (couple: Couple, isRoot = false) => {
    const { left, right, children } = couple;

    return (
      <div className="flex flex-col items-center p-2">
        {isRoot && <AddButton onClick={() => handleAddParents(couple)} />}
        <div className="flex">
          {left && (
            <div
              title={`${left.O}, ${left.C}, ${left.E}, ${left.A}, ${left.N}`}
              className={`${left.gender === Gender.Male ? "font-bold" : ""}`}
            >
              {left.name}
            </div>
          )}
          {couple.right && (
            <AddButton
              onClick={() => handleAddChildren({ right: right!, ...couple })}
            />
          )}
          {right ? (
            <div
              title={`${right.O}, ${right.C}, ${right.E}, ${right.A}, ${right.N}`}
              className={`${right.gender === Gender.Male ? "font-bold" : ""}`}
            >
              {right.name}
            </div>
          ) : (
            <AddButton onClick={() => handleAddPartner(couple)} />
          )}
        </div>
        <div className="w-full flex justify-center border-t-2">
          {children.map((item, i) => (
            <div key={i}>{renderTree(item)}</div>
          ))}
        </div>
      </div>
    );
  };

  if (!treeRef.current) {
    return null;
  }

  return renderTree(treeRef.current, true);
};

export default Family;
