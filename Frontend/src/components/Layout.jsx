import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-8 overflow-y-scroll bg-uiSecondary dark:bg-zinc-900 md:p-8">
      <div className="flex w-full max-w-screen-xl flex-col rounded-lg border-[1px] bg-white pb-1 dark:border-darkUiTertiary dark:bg-zinc-900">
        {children}
      </div>
    </div>
  );
};

export default Layout;
