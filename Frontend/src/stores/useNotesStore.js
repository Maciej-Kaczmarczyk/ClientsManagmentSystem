import { create } from "zustand";

export const useNotesStore = create((set, get) => ({
    notes: [], // all notes
    isLoading: false,
    noteFormVisible: false,
    currentClientID: null,
    toggleNoteForm: () =>
        set((state) => ({ noteFormVisible: !state.noteFormVisible })), // toggle note form
    setClientID: (id) => set({ currentClientID: id }), // set current client id
    fetchNotes: async () => {
        try {
        set({ isLoading: true });
        const notes = await notesService.getAllNotes();
        set({ notes: notes });
        } catch (error) {
        toast.error("Error fetching notes");
        } finally {
        set({ isLoading: false });
        }
    },
    addNote: async (note) => {
        try {
        await notesService.addNote(note);
        } finally {
        get().fetchNotes();
        }
    },
    deleteNote: async (id) => {
        try {
        await notesService.deleteNote(id);
        } finally {
        get().fetchNotes();
        }
    },
    updateNote: async (id, note) => {
        try {
        await notesService.updateNote(id, note);
        } finally {
        get().fetchNotes();
        }
    },
    }));
