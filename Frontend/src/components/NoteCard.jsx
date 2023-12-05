import React from "react";
import DotsIcon from "../assets/icons/dotsIcon.svg";
import ClockIcon from "../assets/icons/clockIcon.svg";

const NoteCard = () => {
  return (
    <div className="flex w-full flex-row rounded-xl p-4 ring-1 ring-zinc-200 hover:cursor-pointer hover:bg-zinc-100">
      <div className="flex flex-col items-center justify-center border-r-2 border-zinc-200 pr-4">
        <div className=" font-normal">Mon</div>
        <div className=" text-2xl font-semibold">01</div>
      </div>
      <div className="flex w-full flex-row items-center justify-between pl-4">
        <div>
          <div>
            <h2 className=" text-xl">Heading</h2>
          </div>
          <div className="flex gap-2 text-zinc-600">
            <ClockIcon className="h-5 w-5" />
            <p className=" text-sm">icon with time</p>
          </div>
        </div>
        <div>
          <DotsIcon className="h-7 w-7 cursor-pointer rounded-full text-zinc-900 hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-600" />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
