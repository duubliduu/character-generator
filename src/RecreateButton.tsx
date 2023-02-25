import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { FunctionComponent } from "react";

type RecreateButtonType = {
  onClick: () => void;
};

const RecreateButton: FunctionComponent<RecreateButtonType> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-lime-400 px-1 py-1 rounded">
      <ArrowPathIcon className="w-6 text-white" />
    </button>
  );
};

export default RecreateButton;
