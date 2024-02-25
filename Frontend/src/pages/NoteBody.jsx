import React, { useEffect, useState } from "react";
import notesService from "../services/notesService";
import { useParams } from "react-router-dom";

const NoteBody = () => {
  const { clientID, noteID } = useParams();

  const [note, setNote] = useState();

  const note_date = new Date(note?.note_date).toLocaleString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const getNote = async () => {
      try {
        const note = await notesService.getNote(clientID, noteID);
        setNote(note);
        console.log(note);
      } catch (error) {
        console.log(error);
      }
    };
    getNote();
  }, [clientID, noteID]);

  return (
    <div className="flex w-full flex-col rounded-xl p-4 ">
      <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-4">
        <div className=" text-2xl font-semibold">{note?.note_header}</div>
        <div className=" text-2xl font-semibold">{note_date}</div>
      </div>
      <div className="flex w-full flex-row items-center justify-between py-4">
        <div>
          <div>
            <h2 className=" text-xl">{note?.note_body}</h2>
          </div>
          <div className="flex gap-2 text-zinc-600"></div>
        </div>
      </div>
    </div>
  );
};

export default NoteBody;
