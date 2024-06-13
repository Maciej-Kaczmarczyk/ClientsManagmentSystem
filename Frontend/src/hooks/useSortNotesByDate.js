//group notes by month and year
const groupNotesByMonth = (notes) => {
  console.log(notes);
  return notes.reduce((acc, note) => {
    const monthYear = new Date(note.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    acc[monthYear] = acc[monthYear] || [];
    acc[monthYear].unshift(note);
    return acc;
  }, {});
};

function sortNotesByDate(notes) {
  // Iterate over each month's notes
  for (const month in notes) {
    // Sort notes of each month by note_date in descending order
    notes[month].sort((a, b) => new Date(b.note_date) - new Date(a.note_date));
  }
  return notes;
}

const useSortNotesByDate = (notes) => {
  const groupedByMonth = groupNotesByMonth(notes);
  return sortNotesByDate(groupedByMonth);
};

export default useSortNotesByDate;
