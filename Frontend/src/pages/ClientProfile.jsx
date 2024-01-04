import React from "react";
import Container from "../components/Container";
import NoteCard from "../components/NoteCard";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { clientNotes } from "../stores/clientNotesTemporary";

const ClientProfile = () => {
  const { clientID } = useParams();

  const groupNotesByMonth = (notes) => {
    return notes.reduce((acc, note) => {
      const monthYear = new Date(note.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      acc[monthYear] = acc[monthYear] || [];
      acc[monthYear].push(note);
      return acc;
    }, {});
  };
  const groupedNotes = groupNotesByMonth(clientNotes);
  return (
    <Container>
      <div className="flex w-full flex-col gap-4">
        {Object.entries(groupedNotes).map(([monthYear, notes]) => (
          <div className="flex flex-col gap-4" key={monthYear}>
            <h2 className=" text-xl font-semibold">{monthYear}</h2>
            {notes.map((note) => (
              <NavLink to={`/clients/${clientID}/notes/${note.id}`}>
                <NoteCard
                  key={note.id}
                  title={note.title}
                  content={note.content}
                  date={note.date}
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
