import React, { useState } from "react";
import Button from "./Button";
import notesService from "../services/notesService";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useNoteFormStore from "../stores/useNoteFormStore";

const NoteForm = () => {
  const { toggleNoteForm, noteFormProps } = useNoteFormStore();
  const { clientID, note, getNotes } = noteFormProps;

  const [formData, setFormData] = useState({
    noteHeader: note ? note.note_header : "",
    noteContent: note ? note.note_body : "",
    noteDate: note ? note.note_date : "",
  });

  const noteDateFormatted = note
    ? new Date(note.note_date).toISOString().split("T")[0]
    : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  console.log(note);

  const saveNote = async () => {
    const note = { ...formData };

    const toastPromise = toast.promise(
      notesService.addNote(
        clientID,
        formData.noteHeader,
        formData.noteContent,
        formData.noteDate,
      ),
      {
        loading: "Saving...",
        success: () => {
          toggleNoteForm();
          getNotes();
          return "Note saved";
        },
        error: "Error while saving",
      },
    );
  };

  const updateNote = async () => {
    const toastPromise = toast.promise(
      notesService.updateNote(
        clientID,
        note.note_id,
        formData.noteHeader,
        formData.noteContent,
        formData.noteDate,
      ),
      {
        loading: "Updating...",
        success: () => {
          toggleNoteForm();
          getNotes();
          return "Note updated";
        },
        error: "Error while updating",
      },
    );
  };

  return (
    <div className="absolute z-10 flex h-full w-full justify-center bg-zinc-900 bg-opacity-50 py-[10vw] shadow-xl md:px-[20vw] ">
      <div className="flex h-fit w-full max-w-screen-md flex-col flex-wrap justify-between gap-8 rounded-lg bg-white px-4 py-12 duration-200 dark:bg-zinc-800 dark:ring-1 dark:ring-zinc-700 md:absolute md:px-8">
        <div className="flex w-full justify-between">
          <h3 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 ">
            Add Note
          </h3>
          <svg
            onClick={toggleNoteForm}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 rounded-full hover:cursor-pointer dark:text-zinc-50 dark:hover:bg-zinc-700 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex w-full flex-wrap justify-between gap-4">
          <div className="w-full">
            <label
              htmlFor="noteHeader"
              className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-400"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                name="noteHeader"
                type="text"
                required
                onChange={handleChange}
                defaultValue={note ? note.note_header : ""}
                className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 `}
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="noteDate"
              className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-400"
            >
              Date
            </label>
            <div className="mt-2">
              <input
                name="noteDate"
                type="date"
                required
                onChange={handleChange}
                value={note ? noteDateFormatted : formData.noteDate}
                className={`block w-full rounded-md py-1.5 px-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 `}
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="noteContent"
              className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-400"
            >
              Note
            </label>
            <div className="mt-2">
              <textarea
                rows="8"
                cols="50"
                name="noteContent"
                type="text"
                required
                onChange={handleChange}
                defaultValue={note ? note.note_body : ""}
                className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 `}
              />
            </div>
          </div>
        </div>
        <Button
          style="bg-blue-600 w-[100%] hover:bg-blue-500"
          text={note ? "Update Note" : "Save Note"}
          method={note ? updateNote : saveNote}
        />
      </div>
    </div>
  );
};

export default NoteForm;
