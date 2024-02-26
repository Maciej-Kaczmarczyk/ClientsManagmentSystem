import { create } from "zustand";

const useClientFormStore = create((set) => ({
  clientFormVisible: false,
  clientFormProps: {},
  toggleClientForm: (client = null) => {
    set((state) => ({
      clientFormVisible: !state.clientFormVisible,
      clientFormProps: { client },
    }));
  },
}));

export default useClientFormStore;
