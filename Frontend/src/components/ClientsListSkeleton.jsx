import React from "react";

function SkeletonItem() {
  return (
    <li className="flex justify-between items-center gap-4 px-8 py-8 border-t-[1px] bg-uiPrimary hover:cursor-pointer hover:bg-uiPrimary animate-pulse">
      <div className="flex flex-wrap items-center xl:justify-center gap-y-8 gap-32">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-48 h-4 rounded-xl bg-uiTertiary"></div>
          <div className="flex flex-col w-60 h-4 rounded-xl bg-uiTertiary"></div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-48 h-4 rounded-xl bg-uiTertiary"></div>
          <div className="flex flex-col w-60 h-4 rounded-xl bg-uiTertiary"></div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-48 h-4 rounded-xl bg-uiTertiary"></div>
          <div className="flex flex-col w-60 h-4 rounded-xl bg-uiTertiary"></div>
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
