import { FunctionComponent } from "react";
import { formatModifier } from "../helpers";

const Trait: FunctionComponent<{ trait: number; title?: string }> = ({
  trait,
  title = "",
}) => (
  <div className="text-center w-10" title={title}>
    <span>{formatModifier(trait)}</span>
  </div>
);

export default Trait;
