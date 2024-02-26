import { create } from "zustand";

const useNoteFormStore = create((set) => ({
  noteFormVisible: false,
  noteFormProps: {},
  toggleNoteForm: (clientID, note = null) => {
    set((state) => ({
      noteFormVisible: !state.noteFormVisible,
      noteFormProps: { clientID, note },
    }));
  },
}));

export default useNoteFormStore;
