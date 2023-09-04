import { PrinterIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, MouseEventHandler } from "react";

type RecreateButtonType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const PrintButton: FunctionComponent<RecreateButtonType> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <PrinterIcon className="w-6 text-slate-400 hover:text-slate-500" />
    </button>
  );
};

export default PrintButton;
