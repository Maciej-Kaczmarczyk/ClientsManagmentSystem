import { create } from "zustand";

const useNoteFormStore = create((set) => ({
  noteFormVisible: false,
  noteFormProps: {},
  toggleNoteForm: (clientID, note = null, getNotes) => {
    set((state) => ({
      noteFormVisible: !state.noteFormVisible,
      noteFormProps: { clientID, note, getNotes },
    }));
  },
}));

export default useNoteFormStore;
