import { FunctionComponent, useContext } from "react";
import { formatModifier } from "../helpers";
import { CharacterContext } from "../CharacterStore";

const Trait: FunctionComponent<{ trait: number; title?: string }> = ({
  trait,
  title = "",
}) => {
  const { settings } = useContext(CharacterContext);

  return (
    <div className="text-center w-10 flex flex-col items-center" title={title}>
      <span>{settings.absoluteValues ? 10 + trait : formatModifier(trait)}</span>
      <span>{settings.absoluteValues ? 10 - trait : formatModifier(trait * -1)}</span>
    </div>
  );
};

export default Trait;
