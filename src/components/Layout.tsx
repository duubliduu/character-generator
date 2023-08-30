import { FunctionComponent, PropsWithChildren } from "react";

const Layout: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="container py-2 text-current select-none text-slate-800">
      <div className="bg-white dark:bg-dark rounded-lg shadow-xl  px-6 py-4 ring-1 ring-slate-200">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
