import { create } from "zustand";
import { WidgetSlice, createWidgetSlice } from "../../slices/widget.slice";

export const useWidgetStore = create<WidgetSlice>()((...a) => ({
    ...createWidgetSlice(...a)
}));