import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import NoteCard from "../components/NoteCard";
import { NavLink, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNotesStore } from "../stores/useNotesStore";
import notesService from "../services/notesService";
import useNoteFormStore from "../stores/useNoteFormStore";
import { toast } from "sonner";

const ClientProfile = () => {
  //access client from URL object
  const { state } = useLocation();
  const client = state;

  //access toggleNoteForm() from global form store
  const { toggleNoteForm } = useNoteFormStore();

  const [groupedNotes, setGroupedNotes] = useState({});

  //fetch notes from database on component mount
  useEffect(() => {
    getNotes();
  }, []);

  //fetch notes from database
  const getNotes = async () => {
    try {
      const notes = await notesService.getAllNotes(client.id);
      const grouped = groupNotesByMonth(notes);
      setGroupedNotes(grouped);
    } catch (error) {
      console.log(error);
    }
  };

  //group notes by month and year
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

  //delete note from database
  const handleDelete = async (client_id, note_id) => {
    try {
      const toastPromise = toast.promise(
        notesService.deleteNote(client_id, note_id),
        {
          loading: "Deleting...",
          success: () => {
            getNotes();
            return "Note deleted";
          },
          error: "Error while deleting",
        },
      );
      toastPromise;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="flex w-full flex-col gap-4">
        <button
          onClick={() => toggleNoteForm(client.id, null, getNotes)}
          className="flex w-full justify-center rounded-xl bg-blue-600 p-2 font-semibold text-white hover:cursor-pointer hover:bg-blue-500"
        >
          Add note
        </button>
        {Object.entries(groupedNotes).map(([monthYear, notes]) => (
          <div className="flex flex-col gap-4" key={monthYear}>
            <h2 className=" text-xl font-semibold">{monthYear}</h2>
            {notes.map((note) => (
              <NoteCard
                note={note}
                key={note.note_id}
                handleDelete={handleDelete}
                toggleNoteForm={toggleNoteForm}
                getNotes={getNotes}
              />
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ClientProfile;
