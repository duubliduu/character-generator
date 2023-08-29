import { FunctionComponent, PropsWithChildren } from "react";

const Table: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 py-2">
        <div className="flex col-span-8">
          <div className="w-10">SPD</div>
          <div className="w-10">Save</div>
          <div>Name</div>
        </div>
        <div className="flex justify-end col-span-4">
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
