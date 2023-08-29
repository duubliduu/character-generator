import { BookmarkIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, MouseEventHandler } from "react";

type RecreateButtonType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const RecreateButton: FunctionComponent<RecreateButtonType> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <BookmarkIcon className="w-6" />
    </button>
  );
};

export default RecreateButton;
