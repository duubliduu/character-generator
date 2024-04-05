import { FunctionComponent, PropsWithChildren } from "react";
import PrintButton from "./PrintButton";

type TableProps = PropsWithChildren<{
  onPrint?: () => void;
}>;

const Table: FunctionComponent<TableProps> = ({ children, onPrint }) => {
  const handlePrint = () => {
    if (typeof onPrint === "function") {
      onPrint();
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 py-2">
        <div className="flex col-span-8">
          <div className="w-10">
            <PrintButton onClick={handlePrint} />
          </div>
          <div className="w-10 font-bold">SP</div>
          <div className="font-bold">Name</div>
        </div>
        <div className="flex justify-end col-span-4">
          {"HEXACO".split("").map((item, index) => (
            <div className="text-center w-10 font-bold" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Table;
