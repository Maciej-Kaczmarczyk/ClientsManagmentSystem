import { create } from "zustand";

const useClientFormStore = create((set) => ({
  isVisible: false,
  props: {},
  toggleClientForm: (client = null) => {
    set((state) => ({
      isVisible: !state.isVisible,
      props: { client },
    }));
  },
}));

export default useClientFormStore;
