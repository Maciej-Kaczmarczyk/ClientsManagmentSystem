import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-8 overflow-y-scroll bg-uiSecondary md:p-8">
      <div className="flex w-full max-w-screen-xl flex-col rounded-lg border-[1px] bg-uiPrimary pb-1">
        {children}
      </div>
    </div>
  );
};

export default Layout;
