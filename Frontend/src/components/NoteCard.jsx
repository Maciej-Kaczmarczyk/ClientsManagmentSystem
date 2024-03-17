import React, { useRef, useState } from "react";
import DotsIcon from "../assets/icons/dotsIcon.svg";
import ClockIcon from "../assets/icons/clockIcon.svg";
import getDayOfWeek from "../hooks/getDayOfWeek";
import { useSpring, animated } from "react-spring";
import { useClickOutside } from "../hooks/useClickOutside";
import { NavLink, useLocation } from "react-router-dom";
import notesService from "../services/notesService";
import { toast } from "sonner";

const NoteCard = ({ note, handleDelete, toggleNoteForm, getNotes }) => {
  //state for the dropdown
  const [optionWindow, setOptionWindow] = useState(false);
  //toggle the dropdown
  const toggleOptionWindow = () => {
    setOptionWindow(!optionWindow);
  };

  //access client from URL object
  const { state } = useLocation();
  const client = state;

  //create a reference to the popup
  const popupRef = useRef();

  //close the popup when clicked outside
  useClickOutside(popupRef, () => {
    setOptionWindow(false);
  });

  //animation for the dropdown
  const dropdownAnimation = useSpring({
    opacity: optionWindow ? 1 : 0,
    transform: optionWindow ? "translateX(0)" : "translateX(20px)",
  });

  function getDayFromDate(date) {
    const newDate = new Date(date);
    const day = newDate.getDate();
    return day;
  }

  return (
    <div className="flex w-full flex-row rounded-xl p-4 ring-1 ring-zinc-200 hover:cursor-pointer hover:bg-zinc-100">
      <div className="flex flex-col items-center justify-center border-r-2 border-zinc-200 pr-4">
        <div className=" font-normal">{getDayOfWeek(note.note_date)}</div>
        <div className=" text-2xl font-semibold">
          {getDayFromDate(note.note_date)}
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-between pl-4">
        <div>
          <div>
            <NavLink to={`/clients/${client.id}/notes/${note.note_id}`}>
              <h2 className=" text-xl">{note.note_header}</h2>
            </NavLink>
          </div>
          <div className="flex gap-2 text-zinc-600">
            <ClockIcon className="h-5 w-5" />
            <p className=" text-sm">icon with time</p>
          </div>
        </div>
        <div ref={popupRef} className="relative">
          <DotsIcon
            onClick={toggleOptionWindow}
            strokeWidth="1.5"
            className="h-6 w-6 cursor-pointer rounded-full text-zinc-900 hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-600"
          />
          {optionWindow ? (
            <div>
              <animated.div
                style={{
                  ...dropdownAnimation,
                }}
                className="absolute -top-1/2 bottom-0 right-10 h-fit w-fit rounded-lg border-[1px] bg-white py-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
              >
                <ul>
                  <li
                    onClick={() => {
                      handleDelete(client.id, note.note_id);
                      setOptionWindow(false);
                    }}
                    className="w-full px-4 hover:cursor-pointer hover:bg-uiSecondary dark:text-zinc-50 dark:hover:bg-zinc-700"
                  >
                    Delete
                  </li>
                  <li
                    onClick={() => toggleNoteForm(client.id, note, getNotes)}
                    className="w-full px-4 hover:cursor-pointer hover:bg-uiSecondary dark:text-zinc-50 dark:hover:bg-zinc-700"
                  >
                    Edit
                  </li>
                </ul>
              </animated.div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
