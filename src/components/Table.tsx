import { FunctionComponent, PropsWithChildren } from "react";

const Table: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 py-2">
        <div>SPD</div>
        <div>Save</div>
        <div className="col-span-6">Name</div>
        <div className="col-span-4 flex justify-between">
          {"OCEAN".split("").map((item, index) => (
            <div className="text-center w-10" key={index}>
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
