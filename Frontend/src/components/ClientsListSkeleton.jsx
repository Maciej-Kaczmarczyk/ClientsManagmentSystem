import React from "react";

function SkeletonItem() {
  return (
    <li className="flex animate-pulse items-center justify-between gap-4 border-t-[1px] bg-uiPrimary px-8 py-8 hover:cursor-pointer hover:bg-uiPrimary dark:bg-gray-800">
      <div className="flex flex-wrap items-center gap-32 gap-y-8 xl:justify-center">
        <div className="flex flex-col gap-4">
          <div className="flex h-4 w-48 flex-col rounded-xl bg-uiTertiary dark:bg-darkUiSecondary"></div>
          <div className="flex h-4 w-60 flex-col rounded-xl bg-uiTertiary dark:bg-darkUiSecondary"></div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex h-4 w-48 flex-col rounded-xl bg-uiTertiary dark:bg-darkUiSecondary"></div>
          <div className="flex h-4 w-60 flex-col rounded-xl bg-uiTertiary dark:bg-darkUiSecondary"></div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex h-4 w-48 flex-col rounded-xl bg-uiTertiary dark:bg-darkUiSecondary"></div>
          <div className="flex h-4 w-60 flex-col rounded-xl bg-uiTertiary dark:bg-darkUiSecondary"></div>
        </div>
      </div>
    </li>
  );
}

const ClientsListSkeleton = () => {
  return (
    <div>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
};

export default ClientsListSkeleton;
