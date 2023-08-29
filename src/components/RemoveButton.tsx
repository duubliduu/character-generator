import { BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";

type RecreateButtonType = {
  onClick: () => void;
};

const RecreateButton: FunctionComponent<RecreateButtonType> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <BookmarkSlashIcon className="w-6" />
    </button>
  );
};

export default RecreateButton;
