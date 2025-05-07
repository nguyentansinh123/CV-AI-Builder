import { create } from "zustand";

interface PremiumState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const usePremium = create<PremiumState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export default usePremium;