import { FunctionComponent } from "react";
import { formatModifier } from "./helpers";

const Trait: FunctionComponent<{ trait: number }> = ({ trait }) => (
  <td className="text-center border-solid border-slate-200 border-2">
    <span>{formatModifier(trait)}</span>
  </td>
);

export default Trait;
