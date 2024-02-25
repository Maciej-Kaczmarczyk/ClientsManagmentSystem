import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import NoteCard from "../components/NoteCard";
import { NavLink, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNotesStore } from "../stores/useNotesStore";
import notesService from "../services/notesService";

const ClientProfile = () => {
  const { state } = useLocation();
  const client = state;
  console.log(useLocation());

  const { toggleNoteForm } = useNotesStore();

  const groupNotesByMonth = (notes) => {
    return notes.reduce((acc, note) => {
      const monthYear = new Date(note.note_date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      acc[monthYear] = acc[monthYear] || [];
      acc[monthYear].push(note);
      return acc;
    }, {});
  };

  const [groupedNotes, setGroupedNotes] = useState({});

  const getNotes = async () => {
    try {
      const notes = await notesService.getAllNotes(client.id);
      const grouped = groupNotesByMonth(notes);
      setGroupedNotes(grouped);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <Container>
      <div className="flex w-full flex-col gap-4">
        <div
          onClick={toggleNoteForm}
          className="flex w-full justify-center rounded-xl bg-blue-600 p-2 hover:cursor-pointer hover:bg-blue-500"
        >
          <p className="font-semibold text-white">+ Add note</p>
        </div>
        {Object.entries(groupedNotes).map(([monthYear, notes]) => (
          <div className="flex flex-col gap-4" key={monthYear}>
            <h2 className=" text-xl font-semibold">{monthYear}</h2>
            {notes.map((note) => (
              <NavLink
                key={note.note_id}
                to={`/clients/${client.id}/notes/${note.note_id}`}
              >
                <NoteCard
                  title={note.note_header}
                  content={note.note_content}
                  date={note.note_date}
                />
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ClientProfile;
