import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, MouseEventHandler } from "react";

type RecreateButtonType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const EditButton: FunctionComponent<RecreateButtonType> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <PencilSquareIcon className="w-6 text-slate-400 hover:text-slate-500" />
    </button>
  );
};

export default EditButton;
