import { Link } from "react-router-dom";
import { FunctionComponent, PropsWithChildren } from "react";

const Layout: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="container py-2 text-current select-none">
      <div className="bg-white dark:bg-dark rounded-lg shadow-xl  px-6 py-4 ring-1 ring-slate-200">
        <div className="flex justify-between min-w-full">
          <Link to={"/"}>Random</Link>
          <Link to={"/bank"}>Bank</Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
