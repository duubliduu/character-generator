import { PlusIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, MouseEventHandler } from "react";

type RecreateButtonType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const AddButton: FunctionComponent<RecreateButtonType> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <PlusIcon className="w-6 text-slate-400 hover:text-slate-500" />
    </button>
  );
};

export default AddButton;
