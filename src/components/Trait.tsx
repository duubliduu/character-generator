import { FunctionComponent, useContext } from "react";
import { formatModifier } from "../helpers";
import { CharacterContext } from "../CharacterStore";

const Trait: FunctionComponent<{ trait: number; title?: string }> = ({
  trait,
  title = "",
}) => {
  const { absolute } = useContext(CharacterContext);

  return (
    <div className="text-center w-10" title={title}>
      {absolute ? 10 + trait : formatModifier(trait)}
    </div>
  );
};

export default Trait;
