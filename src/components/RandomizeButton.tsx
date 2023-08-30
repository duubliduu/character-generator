import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { FunctionComponent } from "react";

type RecreateButtonType = {
  onClick: () => void;
};

const RandomizeButton: FunctionComponent<RecreateButtonType> = ({
  onClick,
}) => {
  return (
    <button onClick={onClick}>
      <ArrowPathIcon className="w-6 text-slate-400 hover:text-slate-500" />
    </button>
  );
};

export default RandomizeButton;
